import e from 'express';
import asyncHandler from '../../middlewares/async-handler';
import Event, { eventType } from '../../../db/event';
import Pitch, { PitchType } from '../../../db/pitch';



const createEvent = asyncHandler(async (req, res, next) => {
    if (req.user?.role == "Admin") {
        const { pitchID } = req.params;
        const { title, startT, endT } = req.body;
        const startTime = new Date(startT);
        const endTime = new Date(endT);
        const pitch: PitchType | null = await Pitch.findById(pitchID);
        const openTime = pitch?.openTime
        const closeTime = pitch?.closeTime
        const eventDateOpenTime = new Date(
            startTime.getFullYear(),
            startTime.getMonth(),
            startTime.getDate(),
            openTime?.getHours(),
            openTime?.getMinutes(),
            openTime?.getSeconds(),
            openTime?.getMilliseconds()
        );
        const eventDateCloseTime = new Date(
            startTime.getFullYear(),
            startTime.getMonth(),
            startTime.getDate(),
            closeTime?.getHours(),
            closeTime?.getMinutes(),
            closeTime?.getSeconds(),
            closeTime?.getMilliseconds()
        );
        var startRange: Date;
        var endRange: Date;
        var notAvailableRange: { start: Date, end: Date }[] = [];
        if (eventDateCloseTime < eventDateOpenTime) {
            startRange = eventDateCloseTime;
            endRange = eventDateOpenTime;
            notAvailableRange.push({ start: startRange, end: endRange })
        } else {
            startRange = eventDateOpenTime;
            endRange = eventDateCloseTime;
            notAvailableRange.push({
                start: new Date(
                    startTime.getFullYear(),
                    startTime.getMonth(),
                    startTime.getDate(),
                    0, 0, 0, 0
                ), end: startRange
            })
            notAvailableRange.push({
                start: endRange, end: new Date(
                    startTime.getFullYear(),
                    startTime.getMonth(),
                    startTime.getDate(),
                    23, 59, 59, 59
                )
            })
        }
        var isStartWithenClosing = notAvailableRange.some(range => {
            return startTime >= range.start && startTime < range.end;
        });
        var isEndWithenClosing = notAvailableRange.some(range => {
            return endTime > range.start && endTime <= range.end;
        });
        console.log("startTime", startTime, "endTime", endTime)
        console.log("start & end Range", startRange, endRange)
        if (isStartWithenClosing || isEndWithenClosing) {
            res.status(400).json({
                message: {
                    message: "Should be within working hours."
                }
            }
            );
            return;
        } else {
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
                const newEvent = await Event.create({ user: req.user?._id, pitchID, title, startTime, endTime })
                res.json({ message: "Event created successfully", newEvent })
            } else {

                res.status(400).json({ error: `startT && endT should be after ${currentTime.toTimeString()}` })
            }
        }
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return
})



export default createEvent;