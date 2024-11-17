import ProductVariantService from '../services/ProductVariantService';
class ProductVariantController {
    createProductVariant = async(req, res) => {
        const { productId } = req.params;
        const { sku, price, color, size } = req.body;
        if (!productId || !sku || !price || !color || !size) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductVariantService.createProductVariant(productId, sku, price, color, size);
            return res.status(200).json(response);
        } catch(error) { 
            return res.status(500).json({ error: error.message });
         };
    }

    updateProductVariant = async(req, res) => {
        const { id } = req.params;
        const { sku, price, color, size } = req.body;
        if (!id || !sku || !price || !color || !size) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductVariantService.updateProductVariant(id, sku, price, color, size);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deleteProductVariant = async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductVariantService.deleteProductVariant(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllProductVariants = async(req, res) => {
        try {
            const response = await ProductVariantService.getAllProductVariants();
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllProductVariantsByProductId = async(req, res) => {
        const { productId } = req.params;
        try {
            const response = await ProductVariantService.getAllProductVariantsByProductId(productId);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getProductVariantById = async(req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                EM: 'Missing required fields',
                EC: 1,
                DT: ''
            });
        }
        try {
            const response = await ProductVariantService.getProductVariantById(id);
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProductVariantController();