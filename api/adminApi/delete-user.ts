
import User from "../../db/user";
import Pitch from "../../db/pitch";

import asyncHandler from "../middlewares/async-handler";

const deleteUser = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {
        const { id } = req.params;

        await User.findByIdAndDelete(id)
        await Pitch.deleteMany({ adminId: id })

        res.json({ message: "User deleted Successfully", deleted: true })
    }
    else {

        res.status(401).json({ error: "Unauthorized" })

    }
    return
})

export default deleteUser;