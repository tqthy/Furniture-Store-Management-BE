import PromotionService from '../services/PromotionService';

class PromotionController {
  // Get all promotions
  static async getAllPromotions(req, res) {
    try {
      const promotions = await PromotionService.getAllPromotions();
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single promotion and its details by ID
  static async getPromotionById(req, res) {
    try {
      const response = await PromotionService.getPromotionProductsByPromotionId(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getCurrentPromotion(req, res) {
    try {
      const { date } = req.query;
      const response = await PromotionService.getPromotionByDate(date);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new promotion
  static async createPromotion(req, res) {
    const { name, description, startDate, finishDate, promotionProducts } = req.body;
    try {
      // validate startDate < endDate
      if (new Date(startDate) >= new Date(finishDate)) {
        return res.status(400).json({ message: 'Start date must be before finish date' });
      }

      const newPromotion = await PromotionService.createPromotion(name, description, startDate, finishDate);
      if (newPromotion.EC === 1) {
        return res.status(400).json({ message: newPromotion.EM });
      }
      const newPromotionProducts = await PromotionService.createPromotionProduct(newPromotion.DT.id, promotionProducts);

      newPromotion.DT.promotionProducts = newPromotionProducts.DT;
      res.status(201).json(newPromotion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update an existing promotion
  static async updatePromotion(req, res) {
    try {
      const { id, name, description, startDate, finishDate, promotionProducts } = req.body;
      // check if status is not active and dropped
      const promotion = await PromotionService.findById(id);
      if (promotion.DT.status !== 'inactive') {
        return res.status(400).json({ message: 'Cannot update an active promotion' });
      }
      
      const newPromotion = PromotionService.updatePromotion(id, name, description, startDate, finishDate);
      if (newPromotion.EC === 1) {
        return res.status(400).json({ message: newPromotion.EM });
      }

      const deletedPromotionProducts = await PromotionService.deletePromotionProducts(id);
      if (deletedPromotionProducts.EC === 1) {
        return res.status(400).json({ message: deletedPromotionProducts.EM });
      }
      const newPromotionProducts = await PromotionService.createPromotionProduct(id, promotionProducts);

      newPromotion.DT.promotionProducts = newPromotionProducts.DT;
      res.status(200).json(newPromotion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a promotion
  static async deletePromotion(req, res) {
    try {
      const deletedPromotion = await PromotionService.delete(req.params.id);
      if (deletedPromotion.EC === 1) {
        return res.status(404).json({ message: 'Promotion not found' });
      }
      res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PromotionController;