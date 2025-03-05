const express = require('express');
const router = require('./routers/routes');
const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.set(`view engine`, 'ejs');
app.use(router);
app.use(express.static('assets'));

app.listen(port, () => console.log(`app up and running on port ${port}`));
