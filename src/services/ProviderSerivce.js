import { where } from "sequelize";
import db from "../models";

class ProviderService {
    createProvider = async (name, address, phone, email, president) => {
        try {
            const provider = await db.Provider.create({
                name: name,
                address: address,
                phone: phone,
                email: email,
                president: president,
                status: 'active'
            });
            return {
                EM: 'Create provider successfully',
                EC: 0,
                DT: provider
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    getAllProviders = async () => {
        try {
            const providers = await db.Provider.findAll();
            return {
                EM: 'Get all providers successfully',
                EC: 0,
                DT: providers
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    getAllActiveProviders = async () => {
        try {
            const providers = await db.Provider.findAll(
                {
                    where: {
                        status: 'active'
                    }
                }
            );
            return {
                EM: 'Get all providers successfully',
                EC: 0,
                DT: providers
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    getProvider = async (id) => {
        try {
            const provider = await db.Provider.findOne({
                where: {
                    id: id
                }
            });
            if (!provider) {
                return {
                    EM: 'Provider not found',
                    EC: 1,
                    DT: ''
                };
            }
            return {
                EM: 'Get provider successfully',
                EC: 0,
                DT: provider
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    updateProvider = async (id, name, address, phone, email, president) => {
        try {
            const provider = await db.Provider.findOne({
                where: {
                    id: id
                }
            });
            if (!provider) {
                return {
                    EM: 'Provider not found',
                    EC: 1,
                    DT: ''
                };
            }
            await db.Provider.update({
                name: name,
                address: address,
                phone: phone,
                email: email,
                president: president
            }, {
                where: {
                    id: id
                }
            });
            const updatedProvider = await db.Provider.findOne({
                where: {
                    id: id
                }
            });
            return {
                EM: 'Update provider successfully',
                EC: 0,
                DT: updatedProvider
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }

    deActiveProvider = async (id) => {
        try {
            const provider = await db.Provider.findOne({
                where: {
                    id: id
                }
            });
            if (!provider) {
                return {
                    EM: 'Provider not found',
                    EC: 1,
                    DT: ''
                };
            }
            await db.Provider.update({
                status: 'inactive'
            }, {
                where: {
                    id: id
                }
            });
            return {
                EM: 'Deactive provider successfully',
                EC: 0,
                DT: ''
            };
        } catch (error) {
            return {
                EM: error.message,
                EC: 1,
                DT: ''
            };
        }
    }
}
module.exports = new ProviderService();