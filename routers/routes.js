const router = require('express').Router();
const Controller = require('../controllers/controllers.js');

router.get('/', Controller.showLogin);
router.post('/', Controller.postLogin);
router.get('/register', Controller.showRegister);
router.post('/register', Controller.postRegister);

//middleware session logout
router.get('/logout', Controller.getLogout);

//middleware sebelum home, setelah login-regis
router.use((req, res, next) => {
  if (!req.session.userId) {
    const error = 'You need to login first to see the page';
    res.redirect(`/?errors=${error}`);
  } else {
    next();
  }
});

//taruh disini routernya kalo ada jangan dibawah, nanti kena session
router.get('/home', Controller.showHome);
router.get('/home/profile', Controller.showProfile)

//cek hanya admin & instructor
router.use((req, res, next) => {
  if (req.session.userRole !== 'instructor' && req.session.userRole !== 'admin') {
    res.redirect('/home');
  } else {
    next();
  }
});

router.get('/home/manage', Controller.studentList);
router.get('/home/manage/addStudent', Controller.addStudent);
router.post('/home/manage/addStudent', Controller.postStudent);
router.get('/home/manage/edit/:id', Controller.editStudent);
router.post('/home/manage/edit/:id', Controller.postEditStudent);
router.get('/home/manage/delete/:id', Controller.deleteUser);


//cek hanya admin
router.use((req, res, next) => {
  if (req.session.userRole !== 'admin') {
    res.redirect('/home/');
  } else {
    next();
  }
});

router.get('/home/manage/addInstructor', Controller.addInstructor);
router.post('/home/manage/addInstructor', Controller.postInstructor);
router.get('/home/manage/editInstructor/:id', Controller.editInstructor);
router.post('/home/manage/editInstructor/:id', Controller.postEditInstructor);
router.get('/home/manage/deleteInstructor/:id', Controller.deleteInstructorr);
module.exports = router;
