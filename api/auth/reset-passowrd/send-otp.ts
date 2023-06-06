import asyncHandler from '../../middlewares/async-handler';
import { sendVerification } from '../../../config/twilioLogic';
import User from '../../../db/user';

const sendOTP = asyncHandler(async (req, res, next) => {
    const phoneNumber = req.params.phoneNumber;
    const user = await User.findOne({ phoneNumber })
    if (!user) {
        return res.status(404).json({ message: "No user found with this number" })
    }
    var verification_check = await sendVerification(phoneNumber);

    res.json(verification_check.status == 'pending')
})

export default sendOTP;