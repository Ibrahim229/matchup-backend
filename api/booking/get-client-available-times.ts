
import Event from "../../db/event";
import asyncHandler from "../middlewares/async-handler";


const getBookedEvents = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {

        const { pitchID } = req.params
        const status = "Active"
        const bookedEvents = await Event.find({ pitchID, status })
        res.json(bookedEvents)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }

})

export default getBookedEvents;