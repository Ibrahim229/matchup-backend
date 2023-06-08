
import Booking from "../../db/booking";
import Period, { PeriodType } from "../../db/period";
import asyncHandler from "../middlewares/async-handler";

const createbook = asyncHandler(async (req, res) => {

    const periodsRequested = await Period.find({ _id: { $in: req.body.periodIDs } });
    console.log("periods is",periodsRequested)
    // if (periodsRequested.some((period) => period. == true)) {
    //     return res.status(400).json({ message: "This time is already booked!!" })
    // } else {
    //     periodsRequested.forEach((element) => {
    //         element?.updateOne({ isBooked: true }, { new: true })
    //     })
    // }

    // const book = await (await (await Booking.create(req.body)).populate({ path: "periodIDs", strictPopulate: false })).populate({ path: "pitchID", strictPopulate: false })

    res.json({ message: "booked succesfully" })
})

export default createbook;


