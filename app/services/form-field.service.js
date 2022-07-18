const db = require('../models');
const formFieldEntity = db.field_form;
const Op = db.Sequelize.Op;
/**
 * Класс для работы с табилцей FormFields, которая хранит поля форм.
 */
class FormFieldService {
    /**
     * Получение полей формы по uuid
     * @param {*} options 
     * @param {*} callback 
     */
    async getFormFieldsByUuid(options = {}, id = null, callback) {
        try {
            const formFields = await formFieldEntity.findAll({
                where: {
                    form_uid: options.form_uid
                }
            });
            callback(null, formFields);
        } catch(error) {
            console.error(`FormFieldService | getFormFieldsByUuid: ${error}`);
        }
    }
    /**
     * Сохранение данных формы 
     * @param {*} options 
     * @param {*} callback 
     */
    async saveFormFields(options = {}, id = null, callback) {
        try {
            const savedFormFields = await formFieldEntity.create({...options});
            callback(null, savedFormFields);
        } catch(error) {
            console.error(`FormFieldService | saveFormFields: ${error}`);
        }
    }
    /**
     * Обновление данных форм
     * @param {*} options 
     * @param {*} id 
     * @param {*} callback 
     */
    async updateFormFields(options = {}, id = null, callback) {
        try {
            const updatedFormFields = await formFieldEntity.update(
                {
                    ...options,
                }, 
                {
                    where: {id: id},
                    returning: true,
                    plain: true,
                }
            );
            callback(null, updatedFormFields);
        } catch(error) {
            console.error(`FormFieldService | updateFormFields: ${error}`);
        }
    }
}

module.exports = new FormFieldService();