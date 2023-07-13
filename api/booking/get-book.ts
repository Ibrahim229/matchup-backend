import Event from "../../db/event";
import asyncHandler from "../middlewares/async-handler";

const getbook = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {

        const userID = req.user?._id.toString()

        var bookes = await Event.find({ user: userID }).populate
        res.json(bookes)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default getbook;