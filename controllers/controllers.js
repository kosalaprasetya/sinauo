const bcrypt = require('bcrypt');
const { User, UserEnrollment, Course, CourseCategory, Category } = require('../models/index.js');

class Controller {
  static async showRegister(req, res) {
    try {
      let { errors, path } = req.query;
      res.render('register', { errors, path });
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      let { name } = req.body;
      await User.create(req.body);

      res.redirect('/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let path = error.errors.map((el) => el.path);
        let message = error.errors.map((el) => el.message);

        res.redirect(`/register?errors=${message}&path=${path}`);
      } else {
        res.send(error);
      }
    }
  }

  static async showLogin(req, res) {
    try {
      let { errors } = req.query;

      res.render('login', { errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      let data = await User.findOne({
        where: {
          email: email,
        },
      });

      if (data) {
        const isValidPw = bcrypt.compareSync(password, data.password);

        if (isValidPw) {
          return res.redirect('/home');
        } else {
          const error = 'Invalid Email / Password';
          return res.redirect(`/?errors=${error}`);
        }
      } else {
        const error = 'Invalid Email / Password';
        return res.redirect(`/?errors=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async home(req, res) {
    try {
      //ambil user data, enrollment
      const allUserData = await User.findAll({
        include: {
          model: UserEnrollment,
          include: {
            model: Course,
          },
        },
      });
      const getCourses = await Course.findAll();
      res.send(allUserData);
      // res.render('home.ejs')
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
