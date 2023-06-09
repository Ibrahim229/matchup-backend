
import Booking from "../../db/booking";
import Period, { PeriodType } from "../../db/period";
import asyncHandler from "../middlewares/async-handler";

const createbook = asyncHandler(async (req, res) => {
    const periodsRequested = (await Period.find({ _id: { $in: req.body.periodIDs } })) as Array<PeriodType>;
    if (periodsRequested.some((period) => period.isBooked == true)) {
        return res.status(400).json({ message: "This time is already booked!!" })
    } else {
        await Period.updateMany({ _id: { $in: req.body.periodIDs } }, { isBooked: true });
    }
    const userID = req.user?._id.toString()

    const book = await Booking.create(req.body, userID)

    res.json({ message: "booked succesfully", book })
})

export default createbook;


