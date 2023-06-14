const express = require('express');
const { adminSignup, adminLogin, bookHistory, bookHistoryByDate, mostIssuedBook, userDetails, deleteUser } = require('../controller/admin.controller');
const { adminVarification } = require('../middleware/middleware');
 const { uploadfile } = require('../utils/user.utils')
const adminRouter = express.Router();

adminRouter.post('/adminsignup', uploadfile.single('image'), adminSignup);
adminRouter.post('/adminlogin', adminLogin);
adminRouter.get('/bookhistory',adminVarification ,bookHistory);
adminRouter.get('/issuedbookbydate',adminVarification ,bookHistoryByDate);
adminRouter.get('/mostissuedbook', adminVarification, mostIssuedBook);
adminRouter.get('/userdetail', adminVarification, userDetails);
adminRouter.delete('/deleteuser', adminVarification, deleteUser);
module.exports = {
    adminRouter,
}