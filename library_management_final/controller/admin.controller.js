const { adminSignupService, adminLoginService, bookHistoryService, bookHistoryByDateService, mostIssuedBookService, userDetailsService, deleteUserService } = require("../service/admin.service")
const path = require('path');
const adminSignup = async (req, res) => {
    try {
        req.body.profile = path.join(__dirname,'../upload/',req.file.originalname);
        res.send(await adminSignupService(req.body));
    } catch (err) {
        res.send(err);
    }
}

const adminLogin = async (req, res) => {
    try {
        res.send(await adminLoginService(req.body, res));
    } catch (err) {
        res.send(err);
    }
}

const bookHistory = async (req, res) => {
    try {
        res.send(await bookHistoryService(req.body));
    } catch (err) {
        res.send(err);
    }
}

const bookHistoryByDate = async (req, res) => {
    try {
        res.send(await bookHistoryByDateService(req.body.date));
    } catch (err) {
        res.send(err);
    }
}

const mostIssuedBook = async (req, res) => {
    try {
        res.send(await mostIssuedBookService());
    } catch (err) {
        res.send(err);
    }
}

const userDetails = async (req, res) => {
    try {
        res.send(await userDetailsService());
    } catch (err) {
        res.send(err);
    }
}

const deleteUser = async (req, res) => {
    console.log('request',req.body);
    try {
        res.send(await deleteUserService(req.body));
    } catch (err) {
        res.send(err);
    }
}
module.exports = {
    adminSignup,
    adminLogin,
    bookHistory,
    bookHistoryByDate,
    mostIssuedBook,
    userDetails,
    deleteUser
}