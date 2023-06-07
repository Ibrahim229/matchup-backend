import asyncHandler from '../../middlewares/async-handler';
import { checkVerification } from '../../../config/twilioLogic';
import jwt from 'jsonwebtoken'
import User from '../../../db/user';
const resetPassword = asyncHandler(async (req, res, next) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;
    var payload = jwt.decode(token, { complete: true })?.payload
    var phoneNumber = (<any>payload).phoneNumber

    // get user row:
    var user = await User.findOne({ phoneNumber })
    if (!user) {
        return res.json({ message: "not valid user" }).status(400)
    }
    // update user password 
    user.password = newPassword
    user.markModified('password');
    user.save()
    res.json({ "data": { "message": "Password reset successfully" } })
})

export default resetPassword;