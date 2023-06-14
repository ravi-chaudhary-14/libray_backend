const path = require('path');
const { userSignup, userLogin, asignBookService, submitBookService, allBookService, issuedBookService } = require('../service/user.service');
const signup = async (req,res) => {
    try {
        req.body.profile = path.join(__dirname,'../upload/',req.file.originalname);
        res.send(await userSignup(req.body));
    } catch (err) {
        res.send(err);
    }
}

const login = async (req, res) => {
    try {
        res.send(await userLogin(req.body, res));
    } catch (err) {
        res.send(err);
    }
}

const asignbook = async (req, res) => {
    try {
        res.send(await asignBookService(req.body));
    } catch (err) {
        res.send(err);
    }
}

const submitBook = async (req, res) => {
    try {
        res.send(await submitBookService(req.body));
    } catch (err) {
        res.send(err);
    }
}

const allBook = async (req, res) => {
    try {
        res.send(await allBookService());
    } catch (err) {
        res.send(err);
    }
}

const alreadyIssuedBook = async (req, res) => {
    try {
        res.send(await issuedBookService(req.body));
    } catch (err) {
        res.send(err);
    }
}
module.exports = {
    signup,
    login,
    asignbook,
    submitBook,
    allBook,
    alreadyIssuedBook,
}