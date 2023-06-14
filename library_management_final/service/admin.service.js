const { ROLE } = require("../constant/constant");
const { getOneData, create, deleteData } = require("../dao/dao");
const { bookModel } = require("../schema/book.schema");
const { issuedBookModel } = require("../schema/issuedbook.schema");
const { userModel } = require("../schema/user.schema");
const { bcryptPassword, comparePassword, generateToken } = require("../utils/user.utils");
const adminSignupService = async (admin) => {
    const { email } = admin;
    const adminExist = await getOneData(userModel, { email });
    if (!adminExist) {
        admin.password = await bcryptPassword(admin.password);
        admin.role = ROLE.admin;
        const result = await create(userModel, admin);
        return result;
    }
    return "user already exist";
}

const adminLoginService = async (admin, res) => {
    const { email } = admin;
    const adminExist = await getOneData(userModel, { email });
    if (!adminExist) {
        return "Please signup first ";
    }
    if (await comparePassword(admin.password, adminExist.password)) {
        const token = await generateToken(adminExist, "admin");
        return {
            token,
            message: "admin has logged in"
        };
    }
    return "Password does not correct";
}

const bookHistoryService = async (req) => {
    const { bookName } = req;
    const book = await getOneData(bookModel, { bookName });
    return await issuedBookModel.aggregate([
        {
            $match: {
                bookId: book._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "student"
            }
        },
        {
            $unwind: "$student"
        },
        {
            $group: {
                _id: "$student._id",
                count: { $sum: 1 },
                studentName: { $first: '$student.name' },
                rollNumber: { $first: '$student.rollNumber' },
            }
        }

    ]);
}

const bookHistoryByDateService = async (data) => {
    const date = new Date(data);
    const dateString = date.toISOString().slice(0, 10);
    return await issuedBookModel.aggregate([
        {
            $addFields: {
                issuedDateString: { $dateToString: { format: "%Y-%m-%d", date: "$issuedDate" } }
            }
        },
        {
            $match: {
                issuedDateString: dateString,
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
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "student"
            }
        },
        {
            $unwind: "$book",
        },
        {
            $unwind: "$student"
        },
        {
            $project: {
                _id: 0,
                bookName: "$book.bookName",
                authorName: "$book.authorName",
                returnDate: 1,
                submit: 1,
                studentName: "$student.name",
                studentRollNumber: "$student.rollNumber",
                studentContact: "$student.contact",
                studentEmail: "$student.email",
                studentaddress: "$student.address",
            }
        }
    ]);
}

const mostIssuedBookService = async () => {
    return await issuedBookModel.aggregate([
        {
            $group: {
                _id: "$bookId",
                userId: {$first: "$userId"},
                count: {$sum: 1},


            }
        },
        {
            $sort: { count: -1}
        },
        {
            $limit: 1,
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book"
            }
        },
        {
            $unwind: "$book"
        },
        {
            $project: {
                _id: 0,
                bookName: "$book.bookName",
                authorName: "$book.authorName",
                numberOfAsignStudent: "$count",
                total: "$book.total",
                available: "$book.available",
                issued: "$book.issued",
            }
        }
    ])
}

const userDetailsService = async () => {
    return await userModel.aggregate([
        {
            $match: {role: 'User'},
        },
    ])
}

const deleteUserService = async (req) => {
    const {email} = req;
    return await deleteData(userModel, {email} )
}
module.exports = {
    adminSignupService,
    adminLoginService,
    bookHistoryService,
    bookHistoryByDateService,
    mostIssuedBookService,
    userDetailsService,
    deleteUserService
}