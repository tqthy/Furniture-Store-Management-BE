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
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_total_good_receipt_cost()
      RETURNS TRIGGER AS $$
      BEGIN
        IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
          UPDATE "GoodsReceipt"
          SET "totalCost" = (SELECT COALESCE(SUM(cost), 0) FROM "GoodsReceiptDetail" WHERE "goodsReceiptId" = NEW."goodsReceiptId") + "shipping"
          WHERE id = NEW."goodsReceiptId";
        
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE "GoodsReceipt"
          SET "totalCost" = (SELECT COALESCE(SUM(cost), 0) FROM "GoodsReceiptDetail" WHERE "goodsReceiptId" = OLD."goodsReceiptId") + "shipping"
          WHERE id = OLD."goodsReceiptId";
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_total_good_receipt_cost_trigger
      AFTER INSERT OR INSERT OR DELETE ON "GoodsReceiptDetail"
      FOR EACH ROW
      EXECUTE PROCEDURE update_total_good_receipt_cost();
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION add_good_receipt_detail_cost()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW."cost" IS DISTINCT FROM (SELECT "Product"."buyingPrice" * NEW."quantity" FROM "Product" WHERE "Product"."id" = NEW."productId") THEN
              UPDATE "GoodsReceiptDetail"
              SET "cost" = "Product"."buyingPrice" * NEW."quantity"
              FROM "Product"
              WHERE "GoodsReceiptDetail"."productId" = "Product"."id"
              AND "GoodsReceiptDetail"."id" = NEW."id";
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER add_good_receipt_detail_cost_trigger
      AFTER INSERT OR UPDATE ON "GoodsReceiptDetail"
      FOR EACH ROW
      EXECUTE FUNCTION add_good_receipt_detail_cost();
      `);
  
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_product_quantity_receipt_on_accept()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."status" = 'accepted' THEN
          UPDATE "Product"
          SET "quantity" = "quantity" + (SELECT "quantity" FROM "GoodsReceiptDetail" WHERE "goodsReceiptId" = NEW."id" AND "productId" = "Product"."id"),
              "available" = "available" + (SELECT "quantity" FROM "GoodsReceiptDetail" WHERE "goodsReceiptId" = NEW."id" AND "productId" = "Product"."id")
          WHERE id IN (SELECT "productId" FROM "GoodsReceiptDetail" WHERE "goodsReceiptId" = NEW."id");
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_product_quantity_receipt_on_accept_trigger
      AFTER UPDATE ON "GoodsReceipt"
      FOR EACH ROW
      EXECUTE PROCEDURE update_product_quantity_receipt_on_accept();      
      `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_product_available_and_status()
      RETURNS TRIGGER AS
      $$
      BEGIN
          -- NEW."available" := NEW."quantity" - NEW."sold" - NEW."defective";
          IF NEW."available" > 0 THEN
              NEW."status" := 'in stock';
          ELSE
              NEW."status" := 'sold out';
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_product_available_and_status_trigger
      BEFORE UPDATE OF "sold", "defective", "available"
      ON "Product"
      FOR EACH ROW
      EXECUTE PROCEDURE update_product_available_and_status();
      `);


    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_total_bill_detail_cost()
      RETURNS TRIGGER AS $$
      BEGIN
        IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
          UPDATE "Bill"
          SET "totalCost" = (SELECT COALESCE(SUM(cost), 0) FROM "BillDetail" WHERE "billId" = NEW."billId") + "shipping"
          WHERE id = NEW."goodsReceiptId";
        
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE "GoodsReceipt"
          SET "totalCost" = (SELECT COALESCE(SUM(cost), 0) FROM "BillDetail" WHERE "billId" = OLD."billId") + "shipping"
          WHERE id = OLD."goodsReceiptId";
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_total_bill_detail_cost_trigger
      AFTER INSERT OR UPDATE OR DELETE ON "BillDetail"
      FOR EACH ROW
      EXECUTE PROCEDURE update_total_bill_detail_cost();
      `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION add_bill_cost()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW."cost" IS DISTINCT FROM (SELECT "Product"."sellingPrice" * NEW."quantity" FROM "Product" WHERE "Product"."id" = NEW."productId") THEN
              UPDATE "BillDetail"
              SET "cost" = "Product"."sellingPrice" * NEW."quantity"
              FROM "Product"
              WHERE "BillDetail"."productId" = "Product"."id"
              AND "BillDetail"."id" = NEW."id";
          END IF;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER add_bill_cost_trigger
      AFTER INSERT OR UPDATE ON "BillDetail"
      FOR EACH ROW
      EXECUTE FUNCTION add_bill_cost();      
      `);


    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_product_quantity_on_bill_accept()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."status" = 'paid' THEN
          UPDATE "Product"
          SET "available" = "available" - (SELECT "quantity" FROM "BillDetail" WHERE "billId" = NEW."id" AND "productId" = "Product"."id"),
              "sold" = "sold" + (SELECT "quantity" FROM "BillDetail" WHERE "billId" = NEW."id" AND "productId" = "Product"."id")
          WHERE id IN (SELECT "productId" FROM "BillDetail" WHERE "billId" = NEW."id");
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_product_quantity_on_bill_accept_trigger
      AFTER UPDATE ON "Bill"
      FOR EACH ROW
      EXECUTE PROCEDURE update_product_quantity_on_bill_accept();
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
      DROP TRIGGER update_product_quantity_on_bill_accept_trigger ON "Bill";
      DROP TRIGGER add_bill_cost_trigger ON "BillDetail";
      DROP TRIGGER update_total_bill_detail_cost_trigger ON "BillDetail";
      DROP TRIGGER update_product_available_and_status_trigger ON "Product";
      DROP TRIGGER update_product_quantity_receipt_on_accept_trigger ON "GoodsReceipt";
      DROP TRIGGER add_good_receipt_detail_cost_trigger ON "GoodsReceiptDetail";
      DROP TRIGGER update_total_good_receipt_cost_trigger ON "GoodsReceiptDetail";
    `);
  }
};
