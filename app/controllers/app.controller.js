const AppService = require('../services/app.service');

class AppController {
    /**
     * Ручка для отоброжения базовой страницы с редактором форм.
     * @param {*} req 
     * @param {*} res 
     */
    async getStaticMainPage(req, res) {
        try {
            AppService.getStaticPage('main.html', res);
        } catch(error) {
            console.error(`AppController | getStaticMainPage: ${error}`);
        }
    }
    /**
     * Ручка отображения страницы на которой переданные даные заполненных полей в форме.
     * @param {*} req 
     * @param {*} res 
     */
    async getStaticSaveDataPage(req, res) {
        try {
             AppService.getStaticSaveDataPage('...', res);
        } catch(error) {
            console.error(`AppController | getStaticSaveDataPage: ${error}`);
        }
    }
}

module.exports = new AppController();