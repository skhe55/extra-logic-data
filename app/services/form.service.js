const db = require('../models');
const formEntity = db.form;
const Op = db.Sequelize.Op;
/**
 * Класс для работы с таблицей Form
 */
class FormService {
    /**
     * Сохранить форму
     * @param {*} options 
     * @param {*} callback 
     */
    async saveForm(options = {}, callback) {
        try {
            const savedForm = await formEntity.create({...options});
            callback(null, savedForm);
        } catch(error) {    
            console.error(`FormService | saveForm : ${error}`);
            callback(error, null);
        }
    }
    /**
     * Получить форму по uuid
     * @param {*} options 
     * @param {*} callback 
     */
    async getFormByUuid(options = {}, callback) {
        try {   
            const form = await formEntity.findOne({
                where: {
                    form_uid: options.form_uid
                }
            });
            callback(null, form);
        } catch(error) {
            console.error(`FormService | getFormByUuid: ${error}`);
        }
    }
}

module.exports = new FormService();