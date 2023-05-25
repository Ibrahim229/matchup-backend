import { sendVerification } from "../../config/twilioLogic";
import User from "../../db/user";
import asyncHandler from "../middlewares/async-handler";

const signup = asyncHandler(async (req, res) => {
    var phoneNumber = req.body.phoneNumber;
    var repetedUser = await User.findOne({ phoneNumber })
    if (repetedUser) {
        if (!repetedUser.isVerified) {
            await User.findByIdAndDelete(repetedUser.id)
        } else {
            const user = await User.create(req.body);
            res.json({ user })
            return
        }
    }
    const user = await User.create(req.body);
    var verfication = await sendVerification(user.phoneNumber)
    res.json({ verfication })
})

export default signup;