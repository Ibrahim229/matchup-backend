
import asyncHandler from "../middlewares/async-handler";
import Event, { eventType } from "../../db/event";

const createbook = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        const userID = req.user?._id.toString()
        const { pitchID } = req.params
        const { startT, endT } = req.body;
        const startTime = new Date(startT);
        const endTime = new Date(endT);
        const allEvents: eventType[] = await Event.find({ pitchID, status: "Active" })
        var startDateIsBusy = allEvents.some(event => {
            return startTime >= event.startTime && startTime < event.endTime;
        });
        var endDateIsBusy = allEvents.some(event => {
            return endTime > event.startTime && endTime <= event.endTime;
        });

        const currentTime = new Date()
        if (startTime >= currentTime && endTime > currentTime && endTime > startTime) {
            if (startDateIsBusy || endDateIsBusy) {
                res.status(400).json({ error: "There is event within this selected slot" })
                return
            }
            const newEvent = await Event.create({ user: userID, pitchID, title: "From Matchup app", startTime, endTime,  fromMobile: true })
            res.json({ message: "Event created successfully", newEvent })
        } else {

            res.status(400).json({ error: `startT && endT should be after ${currentTime.toDateString()}` })
        }
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default createbook;


