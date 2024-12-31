import MaintainanceService from '../services/MaintainanceService';

class MaintainanceController {
  static async getAllWarranties(req, res) {
    try {
      const warranties = await MaintainanceService.getAllWarranties();
      res.status(200).json(warranties);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getWarrantyOrderByWarrantyId(req, res) {
    try {
      const response = await MaintainanceService.getWarrantyOrderByWarrantyId(req.params.warrantyId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getWarrantyOrderByStatus(req, res) {
    try {
      const response = await MaintainanceService.getWarrantyOrderByStatus(req.params.status);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getRepairOrderByStatus(req, res) {
    try {
      const response = await MaintainanceService.getRepairOrderByStatus(req.params.status);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllWarrantyOrders(req, res) {
    try {
      const response = await MaintainanceService.getAllWarrantyOrders();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllRepairOrders(req, res) {
    try {
      const response = await MaintainanceService.getAllRepairOrders();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createWarrantyOrder(req, res) {
    const { warrantyId, description, details, cost, estimateFinishDate } = req.body;
    const staffId = req.user.staffId;
    if (!warrantyId || 
        !description || 
        !details || 
        !staffId || 
        !estimateFinishDate) {
      return res.status(400).json({ message: 'Missing required information' });
    }
    const warrantyOrderData = {
      warrantyId: warrantyId,
      description: description,
      details: details,
      staffId: staffId,
    };

    if (cost) warrantyOrderData.cost = cost;
    if (estimateFinishDate) warrantyOrderData.estimateFinishDate = estimateFinishDate;

    try {
      const response = await MaintainanceService.createWarrantyOrder(warrantyOrderData);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createRepairOrder(req, res) {
    const { productName, customerId ,description, details, cost, estimateFinishDate } = req.body;
    const staffId = req.user.staffId;
    if (!productName || 
        !description || 
        !details || 
        !staffId || 
        !estimateFinishDate || 
        !customerId) {
      return res.status(400).json({ message: 'Missing required information' });
    }
    const repairOrderData = {
      productName: productName,
      customerId: customerId,
      description: description,
      details: details,
      staffId: staffId,
    };

    if (cost) repairOrderData.cost = cost;
    if (estimateFinishDate) repairOrderData.estimateFinishDate = estimateFinishDate;

    try {
      const response = await MaintainanceService.createRepairOrder(repairOrderData);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  static async updateWarrantyOrder(req, res) {
    const { description, details, cost, staffId, estimateFinishDate, status } = req.body;
    const warrantyOrderId = req.params.id;
    const warrantyOrderData = {};
    if (description) warrantyOrderData.description = description;
    if (details) warrantyOrderData.details = details;
    if (cost) warrantyOrderData.cost = cost;
    if (staffId) warrantyOrderData.staffId = staffId;
    if (estimateFinishDate) warrantyOrderData.estimateFinishDate = estimateFinishDate;
    if (status) warrantyOrderData.status = status;
    
    try {
      const response = await MaintainanceService.updateWarrantyOrder(warrantyOrderId, warrantyOrderData);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateRepairOrder(req, res) {
    const { productName, description, details, cost, staffId, estimateFinishDate, status } = req.body;
    const repairOrderId = req.params.id;
    const repairOrderData = {};
    if (productName) repairOrderData.productName = productName;
    if (description) repairOrderData.description = description;
    if (details) repairOrderData.details = details;
    if (cost) repairOrderData.cost = cost;
    if (staffId) repairOrderData.staffId = staffId;
    if (estimateFinishDate) repairOrderData.estimateFinishDate = estimateFinishDate;
    if (status) repairOrderData.status = status;
    
    try {
      const response = await MaintainanceService.updateRepairOrder(repairOrderId, repairOrderData);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteWarrantyOrder(req, res) {
    const warrantyOrderId = req.params.id;
    try {
      const response = await MaintainanceService.deleteWarrantyOrder(warrantyOrderId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteRepairOrder(req, res) {
    const repairOrderId = req.params.id;
    try {
      const response = await MaintainanceService.deleteRepairOrder(repairOrderId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MaintainanceController;