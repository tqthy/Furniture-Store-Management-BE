'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */


    // cập nhật số lượng tồn kho sau khi nhập hàng
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_inventory_after_accept_goods_receipt()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.status = 'accepted' THEN
              UPDATE "Inventory"
              SET 
                  "quantity" = "quantity" + COALESCE((
                      SELECT SUM(grd."quantity") 
                      FROM "GoodsReceiptDetails" grd
                      WHERE grd."goodsReceiptId" = NEW."id" 
                        AND grd."variantId" = "Inventory"."variantId"
                  ), 0),
                  "available" = "available" + COALESCE((
                      SELECT SUM(grd."quantity") 
                      FROM "GoodsReceiptDetails" grd
                      WHERE grd."goodsReceiptId" = NEW."id" 
                        AND grd."variantId" = "Inventory"."variantId"
                  ), 0)
              WHERE "variantId" = "Inventory"."variantId";
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER trg_update_inventory_after_accept_goods_receipt
      AFTER UPDATE OF "status" 
      ON "GoodsReceipt"
      FOR EACH ROW
      WHEN (NEW."status" = 'accepted')
      EXECUTE FUNCTION update_inventory_after_accept_goods_receipt();      
      `);

      // cập nhật số lượng hàng đã bán sau khi thêm hóa đơn
      await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_inventory_after_add_invoice_details()
      RETURNS TRIGGER AS $$
      BEGIN
        -- Cập nhật sold trong Inventory sau khi thêm một InvoiceDetails
        UPDATE "Inventory"
        SET 
          "sold" = "sold" + NEW."quantity"
        WHERE "variantId" = NEW."variantId";

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trg_update_inventory_after_add_invoice_details
      AFTER INSERT
      ON "InvoiceDetails"
      FOR EACH ROW
      EXECUTE FUNCTION update_inventory_after_add_invoice_details();   
      `)

      // cập nhật số lượng tồn kho sau khi hủy hóa đơn
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION revert_inventory_after_invoice_canceled()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.status = 'canceled' AND OLD.status != 'canceled' THEN
                UPDATE "Inventory"
                SET 
                    "sold" = "sold" - COALESCE((
                        SELECT SUM(id."quantity") 
                        FROM "InvoiceDetails" id
                        WHERE id."invoiceId" = OLD."id" 
                          AND id."variantId" = "Inventory"."variantId"
                    ), 0)
                WHERE "variantId" IN (
                    SELECT id."variantId"
                    FROM "InvoiceDetails" id
                    WHERE id."invoiceId" = OLD."id"
                );
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER trg_revert_inventory_after_invoice_canceled
        AFTER UPDATE OF "status"
        ON "Invoice"
        FOR EACH ROW
        WHEN (NEW."status" = 'canceled' AND OLD."status" != 'canceled')
        EXECUTE FUNCTION revert_inventory_after_invoice_canceled();
      `);

      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION update_inventory_after_delete_invoice_details()
        RETURNS TRIGGER AS $$
        BEGIN
          -- Giảm số lượng sold trong Inventory sau khi xóa một InvoiceDetails
          UPDATE "Inventory"
          SET 
            "sold" = "sold" - OLD."quantity"
          WHERE "variantId" = OLD."variantId";

          RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;

        -- Tạo Trigger
        CREATE TRIGGER trg_update_inventory_after_delete_invoice_details
        AFTER DELETE
        ON "InvoiceDetails"
        FOR EACH ROW
        EXECUTE FUNCTION update_inventory_after_delete_invoice_details();
        `);

      // cập nhật số lượng hàng có sẵn sau khi cập nhật số lượng bán, lỗi
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION update_inventory_available()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW."available" := NEW."quantity" - NEW."sold" - NEW."defective";
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER trg_update_inventory_available
        BEFORE UPDATE OF "sold", "defective"
        ON "Inventory"
        FOR EACH ROW
        EXECUTE FUNCTION update_inventory_available();
      `);

      // cập nhật trạng thái biến thể sau khi cập nhật số lượng hàng có sẵn
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION update_product_variant_status()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW."available" = 0 THEN
                UPDATE "ProductVariant"
                SET "status" = 'sold out'
                WHERE "id" = NEW."variantId";
            ELSE
                UPDATE "ProductVariant"
                SET "status" = 'in stock'
                WHERE "id" = NEW."variantId";
            END IF;
            
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER trg_update_product_variant_status
        AFTER UPDATE OF "available"
        ON "Inventory"
        FOR EACH ROW
        EXECUTE FUNCTION update_product_variant_status();
      `);

    // cập nhật số lượng sản phẩm sau khi cập nhật inventory
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION update_product_on_inventory_change()
        RETURNS TRIGGER AS $$
        BEGIN
            UPDATE "Product"
            SET 
                "quantity" = COALESCE((
                    SELECT SUM("quantity") 
                    FROM "Inventory" 
                    WHERE "variantId" IN (
                        SELECT "id" 
                        FROM "ProductVariant" 
                        WHERE "productId" = (SELECT "productId" FROM "ProductVariant" WHERE "id" = NEW."variantId")
                    )
                ), 0),
                "available" = COALESCE((
                    SELECT SUM("available") 
                    FROM "Inventory" 
                    WHERE "variantId" IN (
                        SELECT "id" 
                        FROM "ProductVariant" 
                        WHERE "productId" = (SELECT "productId" FROM "ProductVariant" WHERE "id" = NEW."variantId")
                    )
                ), 0),
                "defective" = COALESCE((
                    SELECT SUM("defective") 
                    FROM "Inventory" 
                    WHERE "variantId" IN (
                        SELECT "id" 
                        FROM "ProductVariant" 
                        WHERE "productId" = (SELECT "productId" FROM "ProductVariant" WHERE "id" = NEW."variantId")
                    )
                ), 0),
                "sold" = COALESCE((
                    SELECT SUM("sold") 
                    FROM "Inventory" 
                    WHERE "variantId" IN (
                        SELECT "id" 
                        FROM "ProductVariant" 
                        WHERE "productId" = (SELECT "productId" FROM "ProductVariant" WHERE "id" = NEW."variantId")
                    )
                ), 0)
            WHERE "id" = (SELECT "productId" FROM "ProductVariant" WHERE "id" = NEW."variantId");
            
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER trg_update_product_on_inventory_change
        AFTER UPDATE OF "available", "sold", "defective", "quantity"
        ON "Inventory"
        FOR EACH ROW
        EXECUTE FUNCTION update_product_on_inventory_change();
        `);

    // cập nhật trạng thái sản phẩm sau khi số lượng bị hàng có sẵn thay đổi
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION update_product_status()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW."available" = 0 THEN
                NEW."status" := 'sold out';
            ELSE
                NEW."status" := 'in stock';
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER trg_update_product_status
        BEFORE UPDATE OF "available", "sold", "defective", "quantity"
        ON "Product"
        FOR EACH ROW
        EXECUTE FUNCTION update_product_status();
        `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_inventory_after_accept_goods_receipt ON "GoodsReceipt";
      `);
    
    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_inventory_available ON "Inventory";
      `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_product_variant_status ON "Inventory";
      `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_product_on_inventory_change ON "Inventory";
      `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_product_status ON "Product";
      `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_inventory_after_add_invoice_details ON "InvoiceDetails";  
      `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_update_inventory_after_delete_invoice_details ON "InvoiceDetails";
      `);  
    await queryInterface.sequelize.query(`
      DROP TRIGGER trg_revert_inventory_after_invoice_canceled ON "Invoice";
      `);
  }
};
