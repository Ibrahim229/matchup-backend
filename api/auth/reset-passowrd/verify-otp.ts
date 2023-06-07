
import asyncHandler from '../../middlewares/async-handler';
import { checkVerification } from '../../../config/twilioLogic';
import jwt from 'jsonwebtoken'
const verifyOTP = asyncHandler(async (req, res, next) => {
    const phoneNumber = req.params.phoneNumber;
    const otp = req.params.otp;
    var isValid = await checkVerification(phoneNumber, otp);
    if (isValid) {
        const token = jwt.sign({ phoneNumber: phoneNumber }, process.env.JWT_SECRET!, { expiresIn: "10m" });
        res.json({ resetToken: token })
    } else {
        res.status(404).json({ message: "Not Valid OTP" }).status(400)
    }
})

export default verifyOTP;