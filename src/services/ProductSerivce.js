import db from "../models/index";

class ProductService {
    createProduct = async(catalogueId, name, description, warranty, category) => {
        try {
            const check = await db.Product.findOne(
                { 
                    where: {
                        catalogueId: catalogueId,
                        name: name,
                        description: description,
                        warranty: warranty,
                        category: category
                    } 
                }
            );
            if (check) {
                return {
                    EM: 'Catalogue already exists',
                    EC: 1,
                    DT: ''
                }    
            }
            const newProduct = await db.Product.create({
                catalogueId: catalogueId,
                category: category,
                name: name,
                image: "",
                description: description,
                available: 0,
                quantity: 0,
                defective: 0,
                sold: 0,
                warranty: warranty,
                status: "stop selling",
            });
            return {
                EM: 'create product successfully',
                EC: 0,
                DT: newProduct
            }   
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    updateProduct = async(id, catalogueId, name, description, warranty, category) => {
        try {
            const product = await db.Product.findOne({
                where: {
                    id: id
                }
            });
            if (!product) {
                return {
                    EM: 'Product not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Product.update({
                catalogueId: catalogueId,
                name: name,
                description: description,
                warranty: warranty,
                category: category
            }, {
                where: {
                    id: id
                }
            });
            return {
                EM: 'Update product successfully',
                EC: 0,
                DT: ''
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    deleteProduct = async(id) => {
        try {
            const product = await db.Product.findOne({
                where: {
                    id: id
                }
            });
            if (!product) {
                return {
                    EM: 'Product not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Product.destroy({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Delete product successfully',
                EC: 0,
                DT: ''
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getAllProducts = async() => {
        try {
            const products = await db.Product.findAll();
            return {
                EM: 'Get products successfully',
                EC: 0,
                DT: products
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    getProductById = async(id) => {
        try {
            const product = await db.Product.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.ProductVariant,
                    }
                ],
                nest : true,
                raw: true
            });
            if (!product) {
                return {
                    EM: 'Product not found',
                    EC: 1,
                    DT: ''
                }
            }
            return {
                EM: 'Get product successfully',
                EC: 0,
                DT: product
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }

    stopSellProduct = async(id) => {
        try {
            const product = await db.Product.findOne({
                where: {
                    id: id
                }
            });
            if (!product) {
                return {
                    EM: 'Product not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.Product.update({
                status: "stop selling"
            }, {
                where: {
                    id: id
                }
            });
            return {
                EM: 'Stop selling product successfully',
                EC: 0,
                DT: ''
            }
        } catch(error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    }
}
module.exports = new ProductService();