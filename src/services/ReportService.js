import db from "../models";

class ReportService {
    getIncomeReport = async (fromDate, toDate) => {
        try {

            const report = await db.sequelize.query(
              // `SELECT PV.id productVariantId, PV.SKU SKU, PV.importPrice importPrice, SUM(InvoiceDetails.quantity) sumQuantity, SUM(InvoiceDetails.cost) sumCost
              // FROM ProductVariant PV
              // LEFT JOIN InvoiceDetails ON ProductVariant.id = InvoiceDetails.variantId
              // LEFT JOIN Invoice ON InvoiceDetails.invoiceId = Invoice.id
              // WHERE Invoice.createdAt BETWEEN :fromDate AND :toDate
              // GROUP BY ProductVariant.id
              // ORDER BY sumCost DESC`,
             `SELECT PV.id AS productVariantId, PV."SKU" AS SKU, PV."buyingPrice" AS importPrice,
              SUM("InvoiceDetails".quantity) AS sumQuantity, SUM("InvoiceDetails".cost) AS sumCost
              FROM "ProductVariant" PV
              LEFT JOIN "InvoiceDetails" ON PV.id = "InvoiceDetails"."variantId"
              LEFT JOIN "Invoice" ON "InvoiceDetails"."invoiceId" = "Invoice".id
              WHERE "Invoice"."createdAt" BETWEEN :fromDate AND :toDate
              GROUP BY PV.id
              ORDER BY sumCost DESC`,
              {
                replacements: {
                  fromDate: fromDate,
                  toDate: toDate
                },
                type: db.sequelize.QueryTypes.SELECT
              }
            )
            
            return {
                EM: 'Get report successfully',
                EC: 0,
                DT: report
            };
        } catch (error) {
          console.error(error);
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }
  
    getSaleStaffReport = async (fromDate, toDate) => {
        try {
            const report = await db.sequelize.query(
              `SELECT "Staff".id AS staffId, 
              "Staff".fullname AS staffName, 
              COUNT("Invoice".id) AS countInvoice, 
              SUM("Invoice"."totalCost") AS sumTotal,
              SUM("InvoiceDetails".quantity) AS sumQuantity
              FROM "Staff"
              LEFT JOIN "Invoice" ON "Staff".id = "Invoice"."staffId"
              LEFT JOIN "InvoiceDetails" ON "Invoice".id = "InvoiceDetails"."invoiceId"
              WHERE "Invoice"."createdAt" BETWEEN :fromDate AND :toDate
              GROUP BY "Staff".id;`,
              {
                replacements: {
                  fromDate: fromDate,
                  toDate: toDate
                },
                type: db.sequelize.QueryTypes.SELECT
              }
            )
            
            return {
                EM: 'Get report successfully',
                EC: 0,
                DT: report
            };
        } catch (error) {
          console.error(error);
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

}

module.exports = new ReportService();