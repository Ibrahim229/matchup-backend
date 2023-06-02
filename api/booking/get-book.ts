
import Booking from "../../db/booking";
import asyncHandler from "../middlewares/async-handler";


const getbook = asyncHandler(async (req, res) => {
    const userID = req.user?._id.toString()
    const { bookingStatus } = req.query
    var bookes = await Booking.find({ userID ,bookingStatus})
    res.json(bookes)
})

export default getbook;