const router = require('express').Router();
const Controller = require('../controllers/controllers.js');


router.get('/', Controller.showLogin);
router.post('/', Controller.postLogin);
router.get('/register', Controller.showRegister)
router.post('/register', Controller.postRegister)

//middleware session logout
router.get('/logout', Controller.getLogout)


//middleware sebelum home, setelah login-regis
router.use((req, res, next) => {
    console.log(req.session)
    if(!req.session.userId){
        const error = 'You need to login first to see the page'
        res.redirect(`/?errors=${error}`)
    }
    else{
        next()
    }
})

router.get('/home', (req,res) => res.render('home.ejs'))


module.exports = router;
