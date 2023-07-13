
// import Booking from "../../db/booking";
import Event, { eventType } from "../../db/event";
import asyncHandler from "../middlewares/async-handler";


const updateBook = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        const { bookID } = req.query
        const { startT, endT } = req.body;
        const startTime = new Date(startT);
        const endTime = new Date(endT);
        const event: eventType | null = await Event.findById(bookID)
        const pitchID = event?.pitchID
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
            const newEvent = await Event.findByIdAndUpdate(bookID, { startTime, endTime }, { new: true })
            if (newEvent) {
                res.json({ message: "Event updated successfully", newEvent })
            } else {
                res.status(404).json({ message: "Event not found" })
            }
        }
        else {

            res.status(400).json({ error: `startT && endT should be after ${currentTime.toDateString()}` })
        }
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default updateBook;