import { Request, Response } from 'express';
import Event from '../../../../db/event';
import Pitch from '../../../../db/pitch';
import { isEventTimeWithinPitch } from '../../../../helpers/is-event-time-within-pitch';
import { EventType } from '../../../../interfaces/event_interface';

export const createNewEvents = async (
	request: Request,
	response: Response,
	pitchID: string,
	event: Partial<EventType>,
	days: string[]
) => {
	// check that new event in pitch working hours
	const eventStartTime = new Date(event.startTime);
	const eventEndTime = new Date(event.endTime);

	try {
		const pitch = await Pitch.findById(pitchID).lean();
		if (pitch === null) {
			return response.status(500).json({ message: 'Internal server error, please try again later.' });
		}

		const isInWorkingHours = isEventTimeWithinPitch(eventStartTime, eventEndTime, pitch.openTime, pitch.closeTime);

		if (isInWorkingHours === false) {
			return response.status(400).json({ message: 'Should be within working hours.' });
		}

		// create events
		const events = days.map((day) => {
			const startTime = new Date(day);
			const endTime = new Date(day);

			startTime.setHours(eventStartTime.getHours());
			endTime.setHours(eventEndTime.getHours());

			return {
				startTime,
				endTime,
				user: request.user?._id,
				pitchID,
				title: event.title,
				description: event.description,
				isAllDay: event.isAllDay,
				recurrenceRule: event.recurrenceRule,
				recurrenceException: event.recurrenceException,
			};
		});

		// check that there is no events in these slots
		const [eventsStartTime, eventsEndTime] = events.reduce(
			(array, currentEvent) => {
				array[0].push(new Date(currentEvent.startTime));
				array[1].push(new Date(currentEvent.endTime));
				return array;
			},
			[[], []] as [Date[], Date[]]
		);

		const allEventsInThisTime = await Event.find({
			status: 'Active',
			$and: [{ startTime: { $in: eventsStartTime } }, { endTime: { $in: eventsEndTime } }],
		}).lean();

		if (allEventsInThisTime.length) {
			return response
				.status(400)
				.json({ message: 'There are events in this time period. Please change the repeat criteria.' });
		} else {
			// insert new events
			const newEvents = await Event.insertMany(events);
			if (Array.isArray(newEvents) && newEvents[0] instanceof Event) return response.json(newEvents);
		}
	} catch (error) {
		console.log({ error });
		return response.status(500).json({ message: 'Internal server error, please try again later.' });
	}
};
