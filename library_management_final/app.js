const express = require('express');
require('./connection/connection');
const app = express();
const bodyParser = require('body-parser');
const { userRouter } = require('./router/user.router');
const { adminRouter } = require('./router/admin.router');
const { bookRouter } = require('./router/book.router');
const cors = require('cors');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRouter);
app.use(adminRouter);
app.use(bookRouter);
app.listen(8080, () => {
    console.log('server devloyed');
})