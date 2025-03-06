const express = require('express');
const router = require('./routers/routes');
const app = express();
const port = 3001;
const session = require('express-session')

app.use(express.urlencoded({ extended: true }));
app.set(`view engine`, 'ejs');
app.use(express.static('assets'));

app.use(session({
    secret: 'yang mana', //harus ada, isi terserah. Secret gaboleh kasih tau ke orang lain, hanya untuk developer biar tidak leak
    resave: false, //untuk simpan credential user. Jika ada perubahan/tidak mau tetapi di save, pake true. Save jika ada perubahaan maka set false
    saveUninitialized: false, //false buat login session (true bakal save user walaupun belum login/request session)
    cookie: { 
        secure: false,
        sameSite: true, //true untuk security dari csrf attack
     } //secure untuk https, tapi karena masih development pake false saja
}))

app.use(router);


app.listen(port, () => console.log(`app up and running on port ${port}`));
