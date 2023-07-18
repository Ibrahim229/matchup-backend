import asyncHandler from "../../middlewares/async-handler"
import User from "../../../db/user";
import Event from "../../../db/event";
import { UserAnalytics } from "../../../interfaces/user_methods_interface";


const getUserAnalytics = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {

        var users: UserAnalytics[] = await User.find({ role: "User" })

        var usersWithBookings: UserAnalytics[] = await Promise.all(users.map(async (user) => {
            var bookings = await Event.find({ user: user._id, status: "OutDated" })
            user.bookings = bookings.length
            return user
        }))

        res.json(usersWithBookings)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return

})

export default getUserAnalytics;