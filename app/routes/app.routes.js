const Router = require('express');
const router = new Router();
const AppController = require('../controllers/app.controller');

router.get('/', AppController.getStaticMainPage);

module.exports = router;