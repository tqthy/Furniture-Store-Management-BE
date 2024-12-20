import { INTEGER, where } from "sequelize";
import db from "../models/index";
class CatalogueService {
    createCatalogue = async (name) => {
        try {
            const check = await db.Catalogue.findOne({
                where: {
                    name: name
                }
            });
            if (check) {
                return {
                    EM: 'Catalogue already exists',
                    EC: 1,
                    DT: ''
                }
            }
            const newCatalogue = await db.Catalogue.create({
                name: name
            });
            return {
                EM: 'create product successfully',
                EC: 0,
                DT: newCatalogue
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getAllCatalogues = async () => {
        try {
            const catalogues = await db.Catalogue.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    include: [
                        // Đếm số lượng Product trong từng Catalogue
                        [                             
                            db.Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM "Product" AS p
                                WHERE p."catalogueId" = "Catalogue"."id"
                            )`),
                            'productCount'
                        ],
                        // Đếm số lượng ProductVariant liên quan
                        [
                            db.Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM "ProductVariant" AS pv
                                WHERE pv."productId" IN (
                                    SELECT p."id"
                                    FROM "Product" AS p
                                    WHERE p."catalogueId" = "Catalogue"."id"
                                )
                            )`),
                            'variantCount'
                        ]
                    ]
                }
            });
            return {
                EM: 'Get all catalogues successfully',
                EC: 0,
                DT: catalogues
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    updateCatalogue = async (id, name) => {
        try {
            const catalogue = await db.Catalogue.findOne({
                where: {
                    id: id
                }
            });
            if (!catalogue) {
                return {
                    EM: 'Catalogue not found',
                    EC: 1,
                    DT: ''
                }
            }
            const check = await db.Catalogue.findOne({
                where: {
                    name: name
                }
            });
            if (check) {
                return {
                    EM: 'Catalogue already exists',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Catalogue.update({
                name: name
            }, {
                where: {
                    id: id
                }
            });
            const updatedCatalogue = await db.Catalogue.findOne({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Update catalogue successfully',
                EC: 0,
                DT: updatedCatalogue
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    deleteCatalogue = async (id) => {
        try {
            const catalogue = await db.Catalogue.findOne({
                where: {
                    id: id
                }
            });
            if (!catalogue) {
                return {
                    EM: 'Catalogue not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Catalogue.destroy({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Delete catalogue successfully',
                EC: 0,
                DT: ''
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

module.exports = new CatalogueService();