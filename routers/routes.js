const router = require('express').Router();
const Controller = require('../controllers/controllers.js');

router.get('/', (req, res) => res.render('login.ejs'));
router.get('/home', (req,res) => res.render('home.ejs'))

module.exports = router;
