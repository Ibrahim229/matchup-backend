
// import asyncHandler from "../middlewares/async-handler";

// const createbook = asyncHandler(async (req, res) => {
//     if (periodsRequested.some((period) => period.isBooked == true)) {
//         return res.status(400).json({ message: "This time is already booked!!" })
//     } else {
//         await Period.updateMany({ _id: { $in: req.body.periodIDs } }, { isBooked: true });
//     }

//     const book = await Booking.create(req.body)

//     res.json({ message: "booked succesfully", book })
// })

// export default createbook;


