import db from "../models";

class DbValueService {
    getValue = async(name) => {
        try {
            const value = await db.system.findOne({
                where: {
                    name: name
                }
            });
            return value.value;
        }
        catch(error) {
            console.log(error);
            return null;
        }
    }
    
    updateValue = async(name, value) => {
        try {
            await db.system.update({
                value: value
            },
            {
                where: {
                    name: name
                }
            });
        } catch(error) {
            console.log(error);
        }
    }
}
module.exports = new DbValueService();