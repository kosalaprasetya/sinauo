const router = require('express').Router();
const Controller = require('../controllers/controllers.js');

router.get('/', (req, res) => res.render('login.ejs'));

module.exports = router;
