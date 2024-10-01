import db from "../models/index";

class GoodsReceiptService {
    createGoodsReceipt = async(shipping, goodsReceiptDetailData) => {
        try {
            const goodsReceipt = await db.GoodsReceipt.create({
                receiptDate: new Date(),
                totalCost: 0,
                status: "pending",
                shipping: shipping
            })
            goodsReceiptDetailData.forEach(async(data) => {
                await db.GoodsReceiptDetail.create({
                    goodsReceiptId: goodsReceipt.id,
                    productId: data.productId,
                    quantity: data.quantity
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
            // if (goodsReceipt.status === 'accepted') {
            //     return {
            //         EM: 'Goods receipt already accepted',
            //         EC: 1,
            //         DT: ''
            //     }
            // }
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
}
module.exports = new GoodsReceiptService();