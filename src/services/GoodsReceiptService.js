import { raw } from "body-parser";
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
            const goodsReceiptDetails = await db.GoodsReceiptDetails.findAll({
                include: [
                    {
                        model: db.GoodsReceipt,
                        attributes: { exclude: ["createdAt", "updatedAt"]}
                    },
                    {
                        model: db.ProductVariant,
                        include: [
                            {
                                model: db.Product,
                                attributes: ['name']
                            }
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt", "status", "buyingPrice"] }
                    },
                ],
                raw: true,
                nest: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            });

            const groupedGoodsReceiptDetails = goodsReceiptDetails.reduce((acc, curr) => {
                const goodsReceiptId = curr.goodsReceiptId;
            
                if (!acc[goodsReceiptId]) {
                    acc[goodsReceiptId] = {
                        goodsReceiptId,
                        ...curr.GoodsReceipt,
                        details: []
                    };
                }
                delete curr.GoodsReceipt;
                acc[goodsReceiptId].details.push(curr); 
                return acc;
            }, {});

            const finalResult = Object.values(groupedGoodsReceiptDetails);
            return {
                EM: 'Get all goods receipts successfully',
                EC: 0,
                DT: finalResult
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
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false
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
                },
                include: [
                    {
                        model: db.GoodsReceiptDetails,
                        attributes: ['quantity', 'cost'],
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product,
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    }
                ],
                raw: false,
                nest: true,
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