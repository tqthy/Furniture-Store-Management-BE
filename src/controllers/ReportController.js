import InvoiceService from '../services/InvoiceService';
import GoodsReceiptService from '../services/GoodsReceiptService';

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

        await Promise.all(promises).then((values) => {
          return res.status(200).json({
            EC: 0,
            EM: 'Get general report successfully',
            DT: {
              totalSoldProduct: values[0].DT,
              totalRevenue: values[1].DT,
              totalExpense: values[2].DT,
              paymentMethodStatistic: values[3].DT,
            },
          });
        });

      } catch (error) {
        console.error(error);
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
}

module.exports = new ReportController();