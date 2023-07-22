
import asyncHandler from "../middlewares/async-handler";
import User from "../../db/user";
import Event from "../../db/event";

const deleteAccount = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        var deletedUser = await User.findByIdAndDelete(req.user._id)
        if (deletedUser) {
            var deledBokkings = await Event.deleteMany({ user: req.user?._id })
            res.json({ message: "User deleted Successfully" })

        } else {
            res.status(404).json({ error: "User not Found" })
        }

    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default deleteAccount;