const bcrypt = require('bcrypt');
const { User, UserEnrollment, Course, CourseCategory, Category } = require('../models/index.js');
const session = require('express-session');
const { Op, where } = require('sequelize');

class Controller {
  static async showHome(req, res) {
    try {
      let role = req.session.userRole;
      let userData = await User.findByPk(req.session.userId)
      userData = userData.dataValues
      console.log(userData)
      const allUserData = await User.findAll({
        include: {
          model: UserEnrollment,
          include: {
            model: Course,
          },
        },
      });
      //   res.send(allUserData);
      res.render('home', { role });
    } catch (error) {
      res.send(error);
    }
  }

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
          req.session.userId = data.id;
          req.session.userRole = data.role;

          return res.redirect('/home');
        } else {
          const error = 'Invalid Email / Password';
          return res.redirect(`/?errors=${error}`);
        }
      } else {
        req.session.user = {};
        const error = 'Invalid Email / Password';
        return res.redirect(`/?errors=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getLogout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/');
        }
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async studentList(req, res) {
    try {
      let { name } = req.query;
      let role = req.session.userRole;
      let data = await User.findAll({
        where: {
          role: {
            [Op.ne]: 'admin',
          },
        },
        order: [['id', 'ASC']],
      });
      data = data.map((el) => el.dataValues);
      res.render('manageStudent', { role, data, name });
    } catch (error) {
      res.send(error);
    }
  }

  static async addStudent(req, res) {
    try {
      let { errors, path } = req.query;
      let role = req.session.userRole;
      res.render('addStudents', { role, errors, path });
    } catch (error) {
      res.send(error);
    }
  }

  static async postStudent(req, res) {
    try {
      await User.create(req.body);

      res.redirect('/home/manage/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let path = error.errors.map((el) => el.path);
        let message = error.errors.map((el) => el.message);

        res.redirect(`/home/manage/addStudent?errors=${message}&path=${path}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async editStudent(req, res) {
    try {
      let { errors, path } = req.query;
      let { id } = req.params;
      let role = req.session.userRole;
      let student = await User.findByPk(+id);

      res.render('editStudent', { student, role, errors, path });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditStudent(req, res) {
    try {
      let { id } = req.params;
      await User.update(req.body, {
        where: {
          id: +id,
        },
      });
      res.redirect('/home/manage');
    } catch (error) {
      let { id } = req.params;
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let path = error.errors.map((el) => el.path);
        let message = error.errors.map((el) => el.message);

        res.redirect(`/home/manage/edit/${id}?errors=${message}&path=${path}`);
      } else {
        res.send(error);
      }
    }
  }

  static async deleteUser(req, res) {
    try {
      let { id } = req.params;
      let role = req.session.userRole;

      let user = await User.findByPk(+id);
      let name = user.name;
      await User.destroy({
        where: {
          id: +id,
        },
      });

      res.redirect(`/home/manage?name=${name}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async addInstructor(req, res) {
    try {
      let { errors, path } = req.query;
      let role = req.session.userRole;
      res.render('addInstructor', { role, errors, path });
    } catch (error) {
      res.send(error);
    }
  }

  static async postInstructor(req, res) {
    try {
      req.body.role = 'instructor'
      await User.create(req.body);

      res.redirect('/home/manage/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let path = error.errors.map((el) => el.path);
        let message = error.errors.map((el) => el.message);

        res.redirect(`/home/manage/addInstructor?errors=${message}&path=${path}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async editInstructor(req, res) {
    try {
      let { errors, path } = req.query;
      let { id } = req.params;
      let role = req.session.userRole;
      let instructor = await User.findByPk(+id);

      res.render('editInstructor', { instructor, role, errors, path });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditInstructor(req, res) {
    try {
      let { id } = req.params;
      await User.update(req.body, {
        where: {
          id: +id,
        },
      });
      res.redirect('/home/manage');
    } catch (error) {
      let { id } = req.params;
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let path = error.errors.map((el) => el.path);
        let message = error.errors.map((el) => el.message);

        res.redirect(`/home/manage/editInstructor/${id}?errors=${message}&path=${path}`);
      } else {
        res.send(error);
      }
    }
  }

  static async deleteInstructorr(req, res) {
    try {
      let { id } = req.params;
      let role = req.session.userRole;

      let user = await User.findByPk(+id);
      let name = user.name;
      await User.destroy({
        where: {
          id: +id,
        },
      });

      res.redirect(`/home/manage?name=${name}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async showProfile(req,res){
    try{
      let role = req.session.userRole
      let data = await User.findByPk(req.session.userId)
      data = data.dataValues
      res.render('Profile', {data, role})
    }
    catch (error){
      res.send(error)
    }
  }
}

module.exports = Controller;
