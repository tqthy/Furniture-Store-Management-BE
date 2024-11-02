import ProviderService from '../services/ProviderSerivce';
class ProviderController {
    createProvider = async(req, res) => {
        const { name, address, phone, email, president } = req.body;
        if (!name || !address || !phone || !email) {
            return res.status(200).json({
                EM: 'Missing provider details',
                EC: '1',
                DT: ''
            });
        }
        try {
            const response = await ProviderService.createProvider(name, address, phone, email, president);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllProviders = async(req, res) => {
        try {
            const response = await ProviderService.getAllProviders();
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllActiveProviders = async(req, res) => {
        try {
            const response = await ProviderService.getAllActiveProviders();
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getProvider = async(req, res) => {
        const { id } = req.params;
        try {
            const response = await ProviderService.getProvider(id);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    updateProvider = async(req, res) => {
        const { id } = req.params;
        const { name, address, phone, email, president } = req.body;
        try {
            const response = await ProviderService.updateProvider(id, name, address, phone, email, president);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }

    deActiveProvider = async(req, res) => {
        const { id } = req.params;
        try {
            const response = await ProviderService.deActiveProvider(id);
            return res.status(200).json(response);
        }
        catch(error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new ProviderController();