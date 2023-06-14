const jwt = require('jsonwebtoken');
const adminVarification = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.body.admin = jwt.verify(token, "admin");
        next();
    } catch (err) {
        res.send(err);
    }
}

const userVarification = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.body.user = jwt.verify(token, "user");
        next();
    } catch (err) {
        res.send(err);
    }
}

const blackListVerification = async (req, res, next) => {
    if(req.body.user.blackList) {
        res.send('User is blackListed');
    }
    next();
}
module.exports = {
    adminVarification,
    userVarification,
    blackListVerification,
}