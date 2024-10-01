import ProductService from '../services/ProductSerivce';
class ProductController {
    createProduct = async(req, res) => {
        const { category, name, buyingPrice, sellingPrice, sku, description, warranty } = req.body;
        if (!category || !name || !buyingPrice || !sellingPrice || !sku || !description || !warranty) {
            return res.status(200).json({
                EM: 'Missing product data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.createProduct(category, name, buyingPrice, sellingPrice, sku, description, warranty);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new ProductController();