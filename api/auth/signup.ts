import User from "../../db/user";
import asyncHandler from "../middlewares/async-handler";

const signup = asyncHandler(async (req, res) => {

    const user = await User.create(req.body);
    let userData = user.toJSON()
    res.json({ userData })
})

export default signup;