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
            const catalogues = await db.Catalogue.findAll();
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
            await db.Catalogue.update({
                name: name
            }, {
                where: {
                    id: id
                }
            });
            return {
                EM: 'Update catalogue successfully',
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