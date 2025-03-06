const router = require('express').Router();
const Controller = require('../controllers/controllers.js');

router.get('/', Controller.showLogin);
router.post('/', Controller.postLogin);
router.get('/home', Controller.home);
router.get('/register', Controller.showRegister);
router.post('/register', Controller.postRegister);

module.exports = router;
