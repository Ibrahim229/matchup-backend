import e from 'express';
import asyncHandler from '../../middlewares/async-handler';
import Event, { eventType } from '../../../db/event';



const createEvent = asyncHandler(async (req, res, next) => {
    if (req.user?.role == "Admin") {
        const { pitchID } = req.params;
        const { title, startT, endT } = req.body;
        const startTime = new Date(startT);
        const endTime = new Date(endT);
        const allEvents: eventType[] = await Event.find({ pitchID, status: "Active" })
        var startDateIsBusy = allEvents.some(event => {
            return startTime >= event.startTime && startTime <= event.endTime;
        });
        var endDateIsBusy = allEvents.some(event => {
            return endTime >= event.startTime && endTime <= event.endTime;
        });

        const currentTime = new Date()
        if (startTime >= currentTime && endTime > currentTime && endTime > startTime) {
            if (startDateIsBusy || endDateIsBusy) {
                res.status(400).json({ error: "There is event within this selected slot" })
            }
            const newEvent = await Event.create({ user: req.user?._id, pitchID, title, startTime, endTime })
            res.json({ message: "Event created successfully", newEvent })
        } else {

            res.status(400).json({ error: `startT && endT should be after ${currentTime.toDateString()}` })
        }
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return
})



export default createEvent;