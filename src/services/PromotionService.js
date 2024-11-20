import { or } from "sequelize";
import db from "../models";

class PromotionService {
  createPromotion = async (name, description, startDate, finishDate) => {
    try {
      // validate startDate, endDate dont overlap with other promotions
      // startDate in [promotion.startDate, promotion.finishDate] 
      // or endDate in [promotion.startDate, promotion.finishDate]

      const overlappedPromotions = await db.Promotion.findAll({
        where: {
          [db.Sequelize.Op.or]: [
        {
          startDate: {
            [db.Sequelize.Op.lte]: finishDate,
            [db.Sequelize.Op.gte]: startDate,
          }
        },
        {
          finishDate: {
            [db.Sequelize.Op.gte]: startDate,
            [db.Sequelize.Op.lte]: finishDate,
          }
        }
          ]
        }
      });

      if (overlappedPromotions.length > 0) {
        return {
          EM: 'Promotion date overlap with other promotions',
          EC: 1,
          DT: ''
        };
      }

      const promotion = await db.Promotion.create({
        name: name,
        description: description,
        startDate: startDate,
        finishDate: finishDate,
      });
      return {
        EM: 'Create promotion successfully',
        EC: 0,
        DT: promotion
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  changeFinishDate = async (id, finishDate) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: id
        }
      });
      console.log(promotion);
      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      promotion.finishDate = finishDate;
      const updateStatus = await db.Promotion.update({
        finishDate: finishDate
      }, {
        where: {
          id: id
        }
      });
      if (!updateStatus) {
        throw new Error('Cannot update promotion');
      }
      return {
        EM: 'Stop promotion and change finish date successfully',
        EC: 0,
        DT: ''
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }
  createPromotionProduct = async (promotionId, promotionProducts) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: promotionId
        }
      });
      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      const promises = [];

      for (let i = 0; i < promotionProducts.length; i++) {
        promises.push(db.PromotionProduct.create({
          promotionId: promotionId,
          variantId: promotionProducts[i].variantId,
          discount: promotionProducts[i].discount
        }));
      }
      await Promise.all(promises);

      return {
        EM: 'Create promotion product successfully',
        EC: 0,
        DT: promotionProducts
      }
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  getAllPromotions = async () => {
    try {
      const promotions = await db.Promotion.findAll();
      return {
        EM: 'Get all promotions successfully',
        EC: 0,
        DT: promotions
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  getPromotionByDate = async (date) => {
    try {
      // include with promotion products
      const promotion = await db.Promotion.findOne({
        where: {
          startDate: {
            [db.Sequelize.Op.lte]: date
          },
          finishDate: {
            [db.Sequelize.Op.gte]: date
          }
        },
        include: db.PromotionProduct,
        raw: false,
        nest: true
      });

      return {
        EM: 'Get promotion by date promotion successfully',
        EC: 0,
        DT: promotion
      }
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  getPromotionProductsByPromotionId = async (id) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: id
        },
        include: {
          model: db.PromotionProduct,
        },
        raw: false,
        nest: true
      });

      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      
      return {
        EM: 'Get promotion successfully',
        EC: 0,
        DT: promotion
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  updatePromotion = async (id, name, description, startDate, finishDate) => {
    try {
      // const overlappedPromotions = await db.Promotion.findAll({
      //   where: {
      //     startDate: {
      //       [db.Sequelize.Op.lte]: finishDate,
      //       [db.Sequelize.Op.gte]: startDate,
      //     },
      //     finishDate: {
      //       [db.Sequelize.Op.gte]: startDate,
      //       [db.Sequelize.Op.lte]: finishDate,
      //     },
      //     id: {
      //       [db.Sequelize.Op.ne]: id
      //     }
      //   }
      // });
      
      const overlappedPromotions = await db.Promotion.findAll({
        where: {
          id: {
            [db.Sequelize.Op.ne]: id
          },
          [db.Sequelize.Op.or]: [
          {
            startDate: {
              [db.Sequelize.Op.lte]: finishDate,
              [db.Sequelize.Op.gte]: startDate,
            }
          },
          {
            finishDate: {
              [db.Sequelize.Op.gte]: startDate,
              [db.Sequelize.Op.lte]: finishDate,
            }
          }
            ]
          }
      });

      if (overlappedPromotions.length > 0) {
        return {
          EM: 'Promotion date overlap with other promotions',
          EC: 1,
          DT: ''
        };
      }

      const updatedPromotion = await db.Promotion.update({
        name: name,
        startDate: startDate,
        finishDate: finishDate,
        description: description
      }, {
        where: {
          id: id
        }
      });
      const updated = {
        id,
        name,
        startDate,
        finishDate,
        description
      }
      return {
        EM: 'Update promotion successfully',
        EC: 0,
        DT: updated
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  findById = async (id) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: id
        }
      });
      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      return {
        EM: 'Get promotion successfully',
        EC: 0,
        DT: promotion
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }


  deletePromotionProducts = async (id) => {
    try {
      await db.PromotionProduct.destroy({
        where: {
          promotionId: id
        }
      });
      return {
        EM: 'Delete promotion products successfully',
        EC: 0,
        DT: ''
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  delete = async (id) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: id
        }
      });
      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      await db.Promotion.destroy({
        where: {
          id: id
        }
      })
      // delete promotion products
      await db.PromotionProduct.destroy({
        where: {
          promotionId: id
        }
      });
      
      return {
        EM: 'Delete promotion successfully',
        EC: 0,
        DT: ''
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }

  findByIdAndSoftDelete = async (id) => {
    try {
      const promotion = await db.Promotion.findOne({
        where: {
          id: id
        }
      });
      if (!promotion) {
        return {
          EM: 'Promotion not found',
          EC: 1,
          DT: ''
        };
      }
      promotion.status = 'inactive';
      await promotion.save();
      return {
        EM: 'Delete promotion successfully',
        EC: 0,
        DT: promotion
      };
    } catch (error) {
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      };
    }
  }
}

module.exports = new PromotionService();