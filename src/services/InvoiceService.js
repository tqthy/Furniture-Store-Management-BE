import db from "../models/index";
class InvoiceService {
    createInvoice = async(totalCost, InvoiceDetailsData, staffId, customerId) => {
        const t = await db.sequelize.transaction();
        try {
            const invoice = await db.Invoice.create({
            status: "pending",
            totalCost: totalCost,
            staffId: staffId,
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

    updateInvoice = async(id, InvoiceDetailsData, totalCost, staffId, customerId) => {
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
                totalCost: totalCost
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
}
module.exports = new InvoiceService();