const express = require('express');
const userRouter = express.Router();
const { uploadfile } = require('../utils/user.utils');
const { signup, login, asignbook, submitBook, allBook, alreadyIssuedBook } = require('../controller/user.controller');
const { userVarification, blackListVerification } = require('../middleware/middleware');
userRouter.post('/signup',uploadfile.single('image'), signup);
userRouter.post('/login',login);
userRouter.post('/asignbook',userVarification, blackListVerification, asignbook);
userRouter.put('/submitbook', userVarification,submitBook);
userRouter.get('/allbook',userVarification, allBook);
userRouter.get('/alreadyIssuedBook', userVarification, alreadyIssuedBook)
module.exports = {
    userRouter,
}