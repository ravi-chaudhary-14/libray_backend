const { userModel } = require('../schema/user.schema');
const { issuedBookModel } = require('../schema/issuedbook.schema');
const { create, updateData } = require('../dao/dao');
const { bcryptPassword, comparePassword, generateToken, updateBookAfterIssue, updateBookAfterSubmit } = require('../utils/user.utils');
const { getOneData } = require('../dao/dao');
const { bookModel } = require('../schema/book.schema');
const userSignup = async (user) => {
    const { email } = user
    if (!await getOneData(userModel, { email })) {
      user.role = 'User';
        user.password = await bcryptPassword(user.password);
        return await create(userModel, user);
    }
    return 'User already exist Please login';
}

const userLogin = async (user, res) => {
    const { email } = user;
    const userExist = await getOneData(userModel, { email });
    if (!userExist) {
        return 'User have not any account please sign up';
    }
    if (await comparePassword(user.password, userExist.password)) {
        const token = await generateToken(userExist, "user")
        return {
            token,
            message:'User have loggedin',
        };
    }
    return 'Password does not match';
}

const asignBookService = async (req) => {
    const { bookName, authorName, user } = req;
    const book = await getOneData(bookModel, { bookName, authorName });
    if (!book || !book.available) {
        return "book is not available";
    }
    const data = {
        bookId: book._id,
        userId: user._id,
        submit: false,
    }
    const issuedBook = await getOneData(issuedBookModel, data);
    if (!issuedBook) {
        await updateBookAfterIssue(bookModel, book);
        const issuedData = await create(issuedBookModel, data);
        await updateData(bookModel, { _id: data.bookId, submitId: issuedData._id });
        return issuedData;
    }
    return "book already asign";
}

const submitBookService = async (req) => {
    const { bookName } = req;
    const book = await getOneData(bookModel, { bookName });
    const data = await getOneData(issuedBookModel, { _id: book.submitId });
    data.submit = true;
    await updateBookAfterSubmit(bookModel, book);
    return await updateData(issuedBookModel, data);
}

const allBookService = async () => {
  return await bookModel.aggregate([
    {
      $lookup: {
        from: 'issuedbooks',
        let: { bookId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$bookId', '$$bookId'] },
                  { $eq: ['$submit', false] }
                ]
              }
            }
          }
        ],
        as: 'issuedInfo',
      },
    },
    {
      $addFields: {
        issued: {
          $cond: [
            { $eq: [{ $size: '$issuedInfo' }, 0] },
            false,
            true,
          ],
        },
      },
    },
    {
      $project: {
        bookName: 1,
        authorName: 1,
        issued: 1,
      },
    },
  ]);
};

const issuedBookService = async (req) => {
  return await issuedBookModel.aggregate([
    {
      $match: {
        submit: false
      }
    },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    },
    {
      $unwind: '$book'
    },
    {
      $project: {
        bookName: '$book.bookName',
        authorName: '$book.authorName',
        available: '$book.available',
      }
    }
  ]);
};

module.exports = {
    userSignup,
    userLogin,
    asignBookService,
    submitBookService,
    allBookService,
    issuedBookService,
}