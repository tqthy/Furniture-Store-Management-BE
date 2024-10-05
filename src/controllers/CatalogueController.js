import CatalogueService from '../services/CatalogueService';
class CatalogueController {
    createCatalogue = async(req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({
                EM: 'Missing Catalogue name',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await CatalogueService.createCatalogue(name);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    updateCatalogue = async(req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({
                EM: 'Missing Catalogue name',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await CatalogueService.updateCatalogue(id, name);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllCatalogues = async(req, res) => {
        try {
            const response = await CatalogueService.getAllCatalogues();
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deleteCatalogue = async(req, res) => {
        const { id } = req.params;
        try {
            const response = await CatalogueService.deleteCatalogue(id);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new CatalogueController();