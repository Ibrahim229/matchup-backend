
import Pitch from "../../db/pitch";
import User from "../../db/user";
import asyncHandler from "../middlewares/async-handler";

const getAdminUsers = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {
        var users = await User.find({ role: "Admin" });
    } else {

        res.status(401).json({ error: "Unauthorized" })

    }


    return

})

export default getAdminUsers;