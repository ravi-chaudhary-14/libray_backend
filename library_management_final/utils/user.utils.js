const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { updateData } = require('../dao/dao')
const uploadfile = multer({
    storage: multer.diskStorage({
  
      destination: (req, file, callback) => {
        callback(null, 'upload/');
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    }),
  });

  const bcryptPassword = async (password) => {
    return await bcrypt.hash(password,8);
  }

  const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  }

  const generateToken = (payload, key) => {
    return jwt.sign(JSON.stringify(payload), key);
  }

  const updateBookAfterIssue = async (model,book) => {
    book.available = book.available - 1;
    book.issued = book.issued + 1;
    return await updateData(model,book);
  }

  const updateBookAfterSubmit = async (model,book) => {
    book.available = book.available + 1;
    book.issued = book.issued - 1;
    return await updateData(model,book);
  }
  module.exports = {
    uploadfile,
    bcryptPassword,
    comparePassword,
    generateToken,
    updateBookAfterIssue,
    updateBookAfterSubmit,
  }