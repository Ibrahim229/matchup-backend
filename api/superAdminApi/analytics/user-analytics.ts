import asyncHandler from "../../middlewares/async-handler"
import User, { UserType } from "../../../db/user";
import Event from "../../../db/event";
import { UserAnalytics } from "../../../interfaces/user_methods_interface";


const getUserAnalytics = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {

        var users: UserType[] = await User.find({ role: "User" })

        var usersWithBookings = await Promise.all(users.map(async (user) => {
            var bookings = await Event.find({ user: user._id, status: "OutDated" })
            let newUser = {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                age: user.age,
                bookings: bookings.length
            }
            return newUser
        }))


        res.json(usersWithBookings)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return

})

export default getUserAnalytics;