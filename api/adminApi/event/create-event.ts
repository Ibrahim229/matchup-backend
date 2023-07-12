import e from 'express';
import asyncHandler from '../../middlewares/async-handler';
import Event from '../../../db/event';



const createEvent = asyncHandler(async (req, res, next) => {
    if (req.user?.role == "Admin") {
        const { pitchID } = req.params;
        const { title, startT, endT } = req.body;
        const startTime = new Date(startT);
        const endTime = new Date(endT);
        const currentTime = new Date()
        if (startTime >= currentTime && endTime > currentTime && endTime > startTime) {
            const newEvent = await Event.create({ userID: req.user?._id, pitchID, title, startTime, endTime })
            res.json({ message: "Event created successfully", newEvent })
        } else {
            res.status(400).json({ error: `startT && endT should be after ${currentTime.toDateString}` })
        }
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return
})

export default createEvent;