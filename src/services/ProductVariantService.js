import db from "../models/index";

class ProductVariantService {
    createProductVariant = async(productId, sku, buyingPrice, price, color, size) => {
        try {
            const check = await db.ProductVariant.findOne(
                { 
                    where: { 
                        productId: productId,
                        SKU: sku,
                        price: price,
                        color: color,
                        size: size,
                        buyingPrice: buyingPrice
                    } 
                }
            );
            if (check) {
                return {
                    EM: 'Product variant already exists',
                    EC: 1,
                    DT: ''
                }    
            }
            const newProductVariant = await db.ProductVariant.create({
                productId: productId,
                SKU: sku,
                price: price,
                buyingPrice: buyingPrice,
                status: "sold out",
                color: color,
                size: size,
                image: ""
            });
            await db.Inventory.create({
                variantId: newProductVariant.id,
                quantity: 0,
                defective: 0,
                sold: 0,
                available: 0,
            });
            return {
                EM: 'create product variant successfully',
                EC: 0,
                DT: newProductVariant
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }

    };

    updateProductVariant = async(id, sku, buyingPrice, price, color, size) => {
        try {
            const productVariant = await db.ProductVariant.findOne({
                where: {
                    id: id
                }
            });
            if (!productVariant) {
                return {
                    EM: 'Product variant not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.ProductVariant.update({
                SKU: sku,
                price: price,
                buyingPrice: buyingPrice,
                color: color,
                size: size
            }, {
                where: {
                    id: id,
                }
            });
            return {
                EM: 'update product variant successfully',
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
        
    };

    deleteProductVariant = async(id) => {
        try {
            const productVariant = await db.ProductVariant.findOne({
                where: {
                    id: id
                }
            });
            if (!productVariant) {
                return {
                    EM: 'Product variant not found',
                    EC: 1,
                    DT: ''
                }
            }
            await db.ProductVariant.destroy({
                where: {
                    id: id
                }
            });
            return {
                EM: 'delete product variant successfully',
                EC: 0,
                DT: ''
            }
        }
        catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    };

    getAllProductVariants = async() => {
        try {
            const productVariants = await db.ProductVariant.findAll();
            return {
                EM: 'Get all product variants successfully',
                EC: 0,
                DT: productVariants
            }  
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    };

    getProductVariantById = async(id) => {
        try {
            const productVariant = await db.ProductVariant.findOne({
                where: {
                    id: id
                }
            });
            if (!productVariant) {
                return {
                    EM: 'Product variant not found',
                    EC: 1,
                    DT: ''
                }
            }
            return {
                EM: 'Get product variant successfully',
                EC: 0,
                DT: productVariant
            }
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            }
        }
    };
}  
module.exports = new ProductVariantService();