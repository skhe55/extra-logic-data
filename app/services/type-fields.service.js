const db = require('../models'); 
const TypeField = db.type_field;
const Op = db.Sequelize.Op;
/**
 * Класс для работы с таблицей Type Fields
 */
class TypeFields {
    /**
     * Ручка для получения типов полей
     * @param {*} options 
     * @param {*} callback 
     */
    async getTypesFields(options = {}, callback) {
        try {
            const typesFields = await TypeField.findAll({});
            callback(null, typesFields);
        } catch(error) {
            console.error(`TypeFields | getTypesFields: ${error}`);
        }
    }
}
module.exports = new TypeFields();