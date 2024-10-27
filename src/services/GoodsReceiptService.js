import db from "../models/index";

class GoodsReceiptService {
    createGoodsReceipt = async(shipping, GoodsReceiptDetailsData, totalCost) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.create({
                receiptDate: new Date(),
                totalCost: 0,
                status: "pending",
                shipping: shipping,
                totalCost: totalCost,
            })
            GoodsReceiptDetailsData.forEach(async(data) => {
                await db.GoodsReceiptDetails.create({
                    goodsReceiptId: goodsReceipt.id,
                    variantId: data.variantId,
                    quantity: data.quantity,
                    cost: data.cost
                })
            });
            return {
                EM: 'Create goods receipt successfully',
                EC: 0,
                DT: goodsReceipt
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    acceptGoodsReceipt = async(id) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.findOne({
                where: {
                    id: id
                }
            })
            if (!goodsReceipt) {
                return {
                    EM: 'Goods receipt not found',
                    EC: 1,
                    DT: ''
                }
            }
            if (goodsReceipt.status === 'accepted') {
                return {
                    EM: 'Goods receipt already accepted',
                    EC: 1,
                    DT: ''
                }
            }
            await db.GoodsReceipt.update({
                status: 'accepted'
            }, {
                where: {
                    id: id,
                }
            })
            return {
                EM: 'Accept goods receipt successfully',
                EC: 0,
                DT: ""
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    rejectGoodsReceipt = async(id) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.findOne({
                where: {
                    id: id
                }
            })
            if (!goodsReceipt) {
                return {
                    EM: 'Goods receipt not found',
                    EC: 1,
                    DT: ''
                }
            }
            if (goodsReceipt.status === 'rejected') {
                return {
                    EM: 'Goods receipt already rejected',
                    EC: 1,
                    DT: ''
                }
            }
            await db.GoodsReceipt.update({
                status: 'rejected'
            }, {
                where: {
                    id: id,
                }
            })
            return {
                EM: 'Reject goods receipt successfully',
                EC: 0,
                DT: ""
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getAllGoodsReceipts = async() => {
        try {
            const goodsReceipts = await db.GoodsReceipt.findAll({
                include: [
                    {
                        model: db.GoodsReceiptDetails,
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ]
                            }
                        ]
                    }
                ],
                raw : true,
                nest : true
            });
            return {
                EM: 'Get all goods receipts successfully',
                EC: 0,
                DT: goodsReceipts
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getGoodsReceipt = async(id) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.GoodsReceiptDetails,
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ]
                            }
                        ]
                    }
                ],
                nest : true,
                raw : true,
            })
            if (!goodsReceipt) {
                return {
                    EM: 'Goods receipt not found',
                    EC: 1,
                    DT: ''
                }
            }
            return {
                EM: 'Get goods receipt successfully',
                EC: 0,
                DT: goodsReceipt
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    updateGoodsReceipt = async(id, shipping, GoodsReceiptDetailsData, totalCost) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.findOne({
                where: {
                    id: id
                }
            })
            if (!goodsReceipt) {
                return {
                    EM: 'Goods receipt not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.GoodsReceipt.update({
                shipping: shipping,
                totalCost: totalCost
            }, {
                where: {
                    id: id
                }
            })
            await db.GoodsReceiptDetails.destroy({
                where: {
                    goodsReceiptId: id
                }
            })
            GoodsReceiptDetailsData.forEach(async(data) => {
                await db.GoodsReceiptDetails.create({
                    goodsReceiptId: id,
                    variantId: data.variantId,
                    quantity: data.quantity,
                    cost: data.cost
                })
            });
            const updatedgoodsReceipt = await db.GoodsReceipt.findOne({
                where: {
                    id: id
                }
            })
            return {
                EM: 'Update goods receipt successfully',
                EC: 0,
                DT: updatedgoodsReceipt
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }
}
module.exports = new GoodsReceiptService();