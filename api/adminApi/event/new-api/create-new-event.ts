import { Request, Response } from 'express';
import Event from '../../../../db/event';
import Pitch from '../../../../db/pitch';
import { isEventTimeWithinRange } from '../../../../helpers/is-event-time-within-pitch';
import { EventType } from '../../../../interfaces/event_interface';

export const createNewEvent = async (
	request: Request,
	response: Response,
	pitchID: string,
	event: Partial<EventType>
) => {
	const {
		title,
		startTime: startTimeString,
		endTime: endTimeString,
		description,
		isAllDay,
		recurrenceRule,
		recurrenceException,
		fromMobile,
	} = event;

	const startTime = new Date(startTimeString);
	const endTime = new Date(endTimeString);

	try {
		const pitch = await Pitch.findById(pitchID).lean();
		if (pitch === null) return response.status(500).json({ message: 'Internal server error, please try again later.' });

		const isInWorkingHours = isEventTimeWithinRange(startTime, endTime, pitch.openTime, pitch.closeTime);

		if (isInWorkingHours === false) {
			return response.status(400).json({ message: 'Should be within working hours.' });
		}

		// check if there is event in that slot
		const slotEvent = await Event.find({
			status: 'Active',
			startTime: { $gte: startTime },
			endTime: { $lte: endTime },
		}).lean();

		if (slotEvent.length) {
			return response.status(400).json({ message: 'There is event within this selected slot' });
		}

		const newEvent = await Event.create({
			user: request.user?._id,
			pitchID,
			title,
			startTime,
			endTime,
			description,
			isAllDay,
			recurrenceRule,
			recurrenceException,
			fromMobile,
		});

		if (newEvent instanceof Event) return response.json(newEvent);
	} catch (error) {
		console.log({ error });
		return response.status(500).json({ message: 'Internal server error, please try again later.' });
	}
};
