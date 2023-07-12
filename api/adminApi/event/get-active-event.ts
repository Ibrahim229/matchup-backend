import e from 'express';
import asyncHandler from '../../middlewares/async-handler';
import Event from '../../../db/event';



const getActiveEvent = asyncHandler(async (req, res, next) => {
    if (req.user?.role == "Admin") {
        const { pitchID } = req.params
        const status = "Active"
        var events = await Event.find({ pitchID, status })
        res.json(events)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return
})

export default getActiveEvent;