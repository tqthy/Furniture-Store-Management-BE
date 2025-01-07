import db from "../models";

class MaintainanceService {

  //missing input validation
  createWarranties = async (warranties) => {
    try {
      let newWarranties = await db.Warranty.bulkCreate(warranties);
      // newWarranties = newWarranties.map(warranty => ({
      //   id: warranty.dataValues.id,
      //   startDate: warranty.dataValues.startDate,
      //   endDate: warranty.dataValues.endDate,
      //   customerId: warranty.dataValues.customerId,
      // }));
      
      return {
        EM: 'Create warranties successfully',
        EC: 0,
        DT: newWarranties
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  getAllWarranties = async () => {
    try {
      const warranties = await db.Warranty.findAll();
      return {
        EM: 'Get all warranties successfully',
        EC: 0,
        DT: warranties
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  getWarrantyOrderByWarrantyId = async (warrantyId) => {
    try {
      const warrantyOrder = await db.WarrantyOrder.findAll({
        where: {
          warrantyId: warrantyId
        }
      });
      return {
        EM: 'Get warranty order by warranty id successfully',
        EC: 0,
        DT: warrantyOrder
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  getWarrantyOrderByStatus = async (status) => {
    try {
      const warrantyOrder = await db.WarrantyOrder.findAll({
        where: {
          status: status
        }
      });
      return {
        EM: 'Get warranty order by status successfully',
        EC: 0,
        DT: warrantyOrder
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  getRepairOrderByStatus = async (status) => {
    try {
      const repairOrder = await db.RepairOrder.findAll({
        where: {
          status: status
        }
      });
      return {
        EM: 'Get repair order by status successfully',
        EC: 0,
        DT: repairOrder
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }


  getAllWarrantyOrders = async () => {
    try {
      const warrantyOrders = await db.WarrantyOrder.findAll();
      return {
        EM: 'Get all warranty orders successfully',
        EC: 0,
        DT: warrantyOrders
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  getAllRepairOrders = async () => {
    try {
      const repairOrders = await db.RepairOrder.findAll();
      return {
        EM: 'Get all repair orders successfully',
        EC: 0,
        DT: repairOrders
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  } 



  createWarrantyOrder = async (warrantyOrder) => {
    try {
      warrantyOrder.status = 'pending';
      const newWarrantyOrder = await db.WarrantyOrder.create(warrantyOrder);
      return {
        EM: 'Create warranty order successfully',
        EC: 0,
        DT: newWarrantyOrder
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  updateWarrantyOrder = async (id, fields) => {
    try {
      const warrantyOrder = await db.WarrantyOrder.findOne({
        where: {
          id: id
        }
      });

      if (!warrantyOrder) {
        throw new Error('Warranty order not found');
      }

      if (fields.status === 'done') {
        fields.finishDate = new Date();
      }

      const [updateCount, updatedWarrantyOrders] = await db.WarrantyOrder.update(fields, {
        where: {
          id: id
        },
        returning: true 
      });
  
      if (updateCount === 0) {
        throw new Error('Cannot update warranty order');
      }
  
      return {
        EM: 'Update warranty order successfully',
        EC: 0,
        DT: updatedWarrantyOrders[0] 
      }
    } catch(error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  createRepairOrder = async (repairOrder) => {
    try {
      repairOrder.status = 'pending';
      const newRepairOrder = await db.RepairOrder.create(repairOrder);
      return {
        EM: 'Create repair order successfully',
        EC: 0,
        DT: newRepairOrder
      }
    } catch (error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  updateRepairOrder = async (id, fields) => {
    try {
      const repairOrder = await db.RepairOrder.findOne({
        where: {
          id: id
        }
      });

      if (!repairOrder) {
        throw new Error('Repair order not found');
      }

      if (fields.status === 'done') {
        fields.finishDate = new Date();
      }

      const [updateCount, updatedRepairOrders] = await db.RepairOrder.update(fields, {
        where: {
          id: id
        },
        returning: true
      });

      if (updateCount === 0) {
        throw new Error('Cannot update repair order');
      }

      return {
        EM: 'Update repair order successfully',
        EC: 0,
        DT: updatedRepairOrders[0]
      }
    } catch(error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  deleteWarrantyOrder = async (id) => {
    try {
      const order = await db.WarrantyOrder.findOne({
        where: {
          id: id
        }
      });

      if (!order) {
        throw new Error('Warranty order not found');
      }
      if (order.status !== 'pending') {
        throw new Error('Cannot delete warranty order');
      }

      const res = await db.WarrantyOrder.destroy({
        where: {
          id: id
        }
      });

      if (!res) {
        throw new Error('Cannot delete warranty order');
      }

      return {
        EM: 'Delete warranty order successfully',
        EC: 0,
        DT: ''
      }
    } catch(error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }

  deleteRepairOrder = async (id) => {
    try {
      const order = await db.RepairOrder.findOne({
        where: {
          id: id
        }
      });

      if (!order) {
        throw new Error('Repair order not found');
      }
      if (order.status !== 'pending') {
        throw new Error('Cannot delete repair order');
      }

      const res = await db.RepairOrder.destroy({
        where: {
          id: id
        }
      });

      if (!res) {
        throw new Error('Cannot delete repair order');
      }

      return {
        EM: 'Delete repair order successfully',
        EC: 0,
        DT: ''
      }
    } catch(error) {
      console.error(error);
      return {
        EM: error.message,
        EC: 1,
        DT: ''
      }
    }
  }
  
}

module.exports = new MaintainanceService();