import e from 'express';
import asyncHandler from '../../middlewares/async-handler';
import Event from '../../../db/event';



const cancelEvent = asyncHandler(async (req, res, next) => {
    if (req.user?.role == "Admin") {
        const { id } = req.params
        await Event.findByIdAndUpdate(id, { status: "Cancelled" })
        res.json({ message: "Event cencelled successfully" })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return
})

export default cancelEvent;