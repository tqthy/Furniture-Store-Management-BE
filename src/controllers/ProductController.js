import ProductService from '../services/ProductSerivce';
class ProductController {
    createProduct = async(req, res) => {
        const { name, description, warranty, catalogueId } = req.body;
        console.log(req.body);
        if (!name  || !warranty) {
            return res.status(200).json({
                EM: 'Missing product data',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.createProduct(catalogueId, name, description, warranty);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    updateProduct = async(req, res) => {
        const { id } = req.params;
        const { catalogueId, name, description, warranty } = req.body;
        if (!id || !name || !description || !warranty) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.updateProduct(id, catalogueId, name, description, warranty);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deleteProduct = async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.deleteProduct(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllProducts = async(req, res) => {
        try {
            const response = await ProductService.getAllProducts();
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getProductById = async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.getProductById(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    stopSellProduct = async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductService.stopSellProduct(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new ProductController();