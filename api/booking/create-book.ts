
import Booking from "../../db/booking";
import Period from "../../db/period";
import asyncHandler from "../middlewares/async-handler";

const createbook = asyncHandler(async (req, res) => {

    const periodRequested = await Period.findById(req.body.periodID)
    if (periodRequested?.isBooked) {
        return res.status(400).json({ message: "This time is already booked!!" })
    } else {
        const newPeriod = await periodRequested?.updateOne({ isBooked: true }, { new: true })
    }

    const book = await (await (await Booking.create(req.body)).populate({ path: "periodID", strictPopulate: false })).populate({ path: "pitchID", strictPopulate: false })

    res.json({ message: "booked succesfully", book })
})

export default createbook;


