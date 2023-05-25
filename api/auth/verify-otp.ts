import asyncHandler from '../middlewares/async-handler';
import { checkVerification } from '../../config/twilioLogic';
import User from '../../db/user';

const verifyOTP = asyncHandler(async (req, res, next) => {
    const phoneNumber = req.params.phoneNumber;
    const otp = req.params.otp;
    const isValid = await checkVerification(phoneNumber, otp);
    if (isValid) {
        await User.updateOne({ phoneNumber }, { isVerified: true })
    }
    res.json(isValid)
})

export default verifyOTP;