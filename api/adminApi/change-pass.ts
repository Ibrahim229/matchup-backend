
import Pitch from "../../db/pitch";
import User from "../../db/user";
import asyncHandler from "../middlewares/async-handler";

const changePass = asyncHandler(async (req, res) => {
    if (req.user?.role == "Admin") {
        var oldPass = req.body.currentPass;
        var newPass = req.body.newPass;
        var user = req.user;
        await user.updateOne({ password: newPass })
        res.json("Pass updated successfully")
    }
    else {

        res.status(401).json({ error: "Unauthorized" })

    }
    return

})

export default changePass;