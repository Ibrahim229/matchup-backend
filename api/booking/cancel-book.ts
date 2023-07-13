
// import Booking from "../../db/booking";
import Event from "../../db/event";
import asyncHandler from "../middlewares/async-handler";


const cancelBook = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        const { bookID } = req.params
        var result = await Event.findByIdAndUpdate(bookID, { status: "Cancelled" })
        if (result)
            res.json({ message: "book canceled successfully" })
        else
            res.status(404).json("Event not found")
    }
    else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default cancelBook;