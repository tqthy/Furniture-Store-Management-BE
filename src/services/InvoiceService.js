import db from "../models/index";
class InvoiceService {
    createInvoice = async(totalCost, InvoiceDetailsData, staffId, customerId, paymentMethod) => {
        const t = await db.sequelize.transaction();
        try {
            const invoice = await db.Invoice.create({
            status: "pending",
            totalCost: totalCost,
            staffId: staffId,
            paymentMethod: paymentMethod,
            customerId: customerId
            }, { transaction: t });
            for (const data of InvoiceDetailsData) {
                await db.InvoiceDetails.create({
                    invoiceId: invoice.id,
                    variantId: data.variantId,
                    quantity: data.quantity,
                    cost: data.cost,
                    unitPrice: data.unitPrice,
                    discountAmount: data.discountAmount
                }, { transaction: t });
            }

            await t.commit();
            return {
            EM: 'Create invoice receipt successfully',
            EC: 0,
            DT: invoice
            };
        } catch (error) {
            if (!t.finished) await t.rollback();
            return {
            EM: error.message,
            EC: 1,
            DT: ''
            };
        }
    }

    acceptInvoice = async(id) => {
        try {
            const Invoice = await db.Invoice.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.InvoiceDetails,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ],
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            }
                        ]
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                nest: true,
                raw: false
            })
            if (!Invoice) {
                return {
                    EM: 'Invoice not found',
                    EC: 1,
                    DT: ''
                }
            }
            if (Invoice.status === 'paid') {
                return {
                    EM: 'Invoice already paid',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Invoice.update({
                status: 'paid'
            }, {
                where: {
                    id: id,
                }
            })
            Invoice.status = 'paid';
            return {
                EM: 'Accept invoice successfully',
                EC: 0,
                DT: Invoice
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    rejectInvoice = async(id) => {
        try {
            const Invoice = await db.Invoice.findOne({
                where: {
                    id: id
                }
            })
            if (!Invoice) {
                return {
                    EM: 'Invoice not found',
                    EC: 1,
                    DT: ''
                }
            }
            if (Invoice.status === 'canceled') {
                return {
                    EM: 'Invoice already rejected',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Invoice.update({
                status: 'canceled'
            }, {
                where: {
                    id: id,
                }
            })
            return {
                EM: 'Reject invoice successfully',
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

    getAllInvoices = async() => {
        try {
            const Invoices = await db.Invoice.findAll({
                include: [
                    {
                        model: db.InvoiceDetails,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ],
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            }
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    },
                    {
                        model: db.Customer,
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false
            })
            return {
                EM: 'Get all goods receipt successfully',
                EC: 0,
                DT: Invoices
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getInvoice = async(id) => {
        try {
            const Invoice = await db.Invoice.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.InvoiceDetails,
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ],
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            },
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    },
                    {
                        model: db.Customer,
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false
            })
            if (!Invoice) {
                return {
                    EM: 'Invoice not found',
                    EC: 1,
                    DT: ''
                }
            }
            return {
                EM: 'Get Invoice successfully',
                EC: 0,
                DT: Invoice
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    updateInvoice = async(id, InvoiceDetailsData, totalCost, staffId, customerId, paymentMethod) => {
        try {
            const Invoice = await db.Invoice.findOne({
                where: {
                    id: id
                }
            })
            if (!Invoice || Invoice.status === 'paid' || Invoice.status === 'canceled') {
                return {
                    EM: 'Invoice not found or already paid or rejected',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Invoice.update({
                staffId: staffId,
                customerId: customerId,
                totalCost: totalCost,
                paymentMethod: paymentMethod
            }, {
                where: {
                    id: id
                }
            })
            await db.InvoiceDetails.destroy({
                where: {
                    invoiceId: id
                }
            })
            InvoiceDetailsData.forEach(async(data) => {
                await db.InvoiceDetails.create({
                    invoiceId: id,
                    variantId: data.variantId,
                    quantity: data.quantity,
                    cost: data.cost,
                    unitPrice: data.unitPrice,
                    discountAmount: data.discountAmount
                })
            });
            const updatedInvoice = await db.Invoice.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.InvoiceDetails,
                        include: [
                            {
                                model: db.ProductVariant,
                                include: [
                                    {
                                        model: db.Product
                                    }
                                ],
                                attributes: { exclude: ["createdAt", "updatedAt"] }
                            },
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return {
                EM: 'Update goods receipt successfully',
                EC: 0,
                DT: updatedInvoice
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getTotalSoldProduct = async (fromDate, toDate) => {
        try {
            const Invoices = await db.Invoice.findAll({
                where: {
                    status: 'paid',
                    createdAt: {
                        [db.Sequelize.Op.between]: [fromDate, toDate]
                    }
                },
                include: [
                    {
                        model: db.InvoiceDetails,
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false
            })
            let totalSoldProduct = 0;
            Invoices.forEach(Invoice => {
                Invoice.InvoiceDetails.forEach(InvoiceDetail => {
                    totalSoldProduct += InvoiceDetail.quantity;
                })
            })
            return {
                EM: 'Get total sold product successfully',
                EC: 0,
                DT: totalSoldProduct
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

    getTotalRevenue = async (fromDate, toDate) => {
        try {
            const Invoices = await db.Invoice.findAll({
                where: {
                    status: 'paid',
                    createdAt: {
                        [db.Sequelize.Op.between]: [fromDate, toDate]
                    }
                },
                include: [
                    {
                        model: db.InvoiceDetails,
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                nest: true,
                raw: false
            })
            let totalRevenue = 0;
            Invoices.forEach(Invoice => {
                Invoice.InvoiceDetails.forEach(InvoiceDetail => {
                    totalRevenue += InvoiceDetail.totalCost;
                })
            })
            return {
                EM: 'Get total revenue successfully',
                EC: 0,
                DT: totalRevenue
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

    getPaymentMethodStatistic = async(fromDate, toDate) => {
        try {
            const Invoices = await db.Invoice.findAll({
                where: {
                    status: 'paid',
                    createdAt: {
                        [db.Sequelize.Op.between]: [fromDate, toDate]
                    }
                },
                nest: true,
                raw: false
            })
            let paymentMethodStatistic = {};
            Invoices.forEach(Invoice => {
                if (paymentMethodStatistic[Invoice.paymentMethod]) {
                    paymentMethodStatistic[Invoice.paymentMethod] += Invoice.totalCost;
                } else {
                    paymentMethodStatistic[Invoice.paymentMethod] = Invoice.totalCost;
                }
            })
            return {
                EM: 'Get payment method statistic successfully',
                EC: 0,
                DT: paymentMethodStatistic
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
}
module.exports = new InvoiceService();