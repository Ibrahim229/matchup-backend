import e from 'express';
import User from '../../db/user';
import generatePassword from '../../helpers/generate-pass';
import asyncHandler from '../middlewares/async-handler';


const generateUser = asyncHandler(async (req, res, next) => {
    // if (req.user?.role == "superAdmin") {
        const userName = req.params.userName;

        const newPass = generatePassword()

        const user = await User.create({ fullName: userName, phoneNumber: userName, email: userName, age: 25, gender: "male", isVerified: true, role:"superAdmin", password: newPass });
        res.json({ username: userName, password: newPass })
    // } else {
    //     res.status(401).json({ error: "Unauthorized" })
    // }
    return
})

export default generateUser;