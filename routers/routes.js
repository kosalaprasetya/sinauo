const router = require('express').Router();
const Controller = require('../controllers/controllers.js');

router.get('/', Controller.showLogin);
router.post('/', Controller.postLogin);
router.get('/home', Controller.home);
router.get('/register', Controller.showRegister);
router.post('/register', Controller.postRegister);

//middleware session logout
router.get('/logout', Controller.getLogout)


//middleware sebelum home, setelah login-regis
router.use((req, res, next) => {
    if(!req.session.userId){
        const error = 'You need to login first to see the page'
        res.redirect(`/?errors=${error}`)
    }
    else{
        next()
    }
})

router.get('/home', Controller.showHome)
//taruh disini routernya kalo ada jangan dibawah, nanti kena session


router.use((req, res, next) => {
    if(req.session.userRole !== 'instructor' && req.session.userRole !== 'admin'){
        res.redirect('/home')
    }
    else{
        next()
    }
})

router.get('/home/manage', Controller.studentList)
router.get('/home/manage/addStudent', Controller.addStudent)
router.post('/home/manage/addStudent', Controller.postStudent)
router.get('/home/manage/edit/:id', Controller.editStudent)
router.post('/home/manage/edit/:id', Controller.postEditStudent)
router.get('/home/manage/delete/:id', Controller.deleteUser)
router.get('/home/manage/addInstructor')
router.post('/home/manage/addInstructor')


module.exports = router;
