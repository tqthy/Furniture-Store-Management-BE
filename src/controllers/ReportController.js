import ReportService from '../services/ReportService';

class ReportController {
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