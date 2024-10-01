import db from "../models/index";

class ProductService {
    createProduct = async(category, name, buyingPrice, sellingPrice, sku, description, warranty) => {
        try {
            const check = await db.Product.findOne(
                { 
                    where: { 
                        sku: sku,
                        category: category,
                        name: name,
                        description: description,
                        warranty: warranty
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
                category: category,
                name: name,
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
                sku: sku,
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
}
module.exports = new ProductService();