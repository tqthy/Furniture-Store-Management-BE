import db from "../models/index";
class CatalogueService {
    createCatalogue = async (name) => {
        try {
            console.log("hello")
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
}

module.exports = new CatalogueService();