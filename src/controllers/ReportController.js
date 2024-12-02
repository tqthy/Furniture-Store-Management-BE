import InvoiceService from '../services/InvoiceService';
import GoodsReceiptService from '../services/GoodsReceiptService';
import ReportService from '../services/ReportService';
import PromotionService from '../services/PromotionService';

class ReportController {
  async getGeneralReport(req, res) {
      try {
        const { fromDate, toDate } = req.query;
        const promises = [];
        const totalSoldProduct = InvoiceService.getTotalSoldProduct(fromDate, toDate);
        promises.push(totalSoldProduct);
        const totalRevenue = InvoiceService.getTotalRevenue(fromDate, toDate);
        promises.push(totalRevenue);
        const totalExpense = GoodsReceiptService.getTotalImportCost(fromDate, toDate);
        promises.push(totalExpense);
        const paymentMethodStatistic = InvoiceService.getPaymentMethodStatistic(fromDate, toDate);
        promises.push(paymentMethodStatistic);
        const currentPromotionResult = PromotionService.getPromotionByDate(toDate);
        promises.push(currentPromotionResult);

        let result = {};

        await Promise.all(promises).then((values) => {
          result.totalSoldProduct = values[0].DT;
          result.totalRevenue = values[1].DT;
          result.totalExpense = values[2].DT;
          result.paymentMethodStatistic = values[3].DT;
          result.currentPromotion = values[4].DT;
        });

        const totalQuantitySoldAndRevenueByPromotion = await InvoiceService.getTotalQuantitySoldAndRevenueByPromotion(result.currentPromotion.id);
        result.currentPromotion.totalQuantitySold = totalQuantitySoldAndRevenueByPromotion.DT.totalQuantitySold;
        result.currentPromotion.totalRevenue = totalQuantitySoldAndRevenueByPromotion.DT.totalRevenue;


        return res.status(200).json({
          EC: 0,
          EM: 'Get general report successfully',
          DT: result
        });

      } catch (error) {
        return res.status(500).json({ 
          error: error.message,
          EC: 1, 
        });
      }
  }

  getIncomeReport = async(req, res) => {
    const { fromDate, toDate } = req.query;
    try {
        const response = await ReportService.getIncomeReport(fromDate, toDate);
        return res.status(200).json(response);
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    } 
  }

  getSaleStaffReport = async(req, res) => {
    const { fromDate, toDate } = req.query;
    try {
        const response = await ReportService.getSaleStaffReport(fromDate, toDate);
        return res.status(200).json(response);
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    } 
  }
}

module.exports = new ReportController();