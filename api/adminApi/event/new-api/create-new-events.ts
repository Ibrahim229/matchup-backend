import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Event from '../../../../db/event';
import Pitch from '../../../../db/pitch';
import { isEventTimeWithinRange, isWithinRange } from '../../../../helpers/is-event-time-within-pitch';
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
	const seriesId = new ObjectId();

	try {
		const pitch = await Pitch.findById(pitchID).lean();
		if (pitch === null) {
			return response.status(500).json({ message: 'Internal server error, please try again later.' });
		}

		const isInWorkingHours = isEventTimeWithinRange(eventStartTime, eventEndTime, pitch.openTime, pitch.closeTime);

		if (isInWorkingHours === false) {
			return response.status(400).json({ message: 'Should be within working hours.' });
		}

		// create events
		const events = days.map((day) => {
			const startTime = new Date(day);
			const endTime = new Date(day);

			startTime.setHours(eventStartTime.getHours());

			endTime.setDate(endTime.getDate() + (eventEndTime.getDate() - eventStartTime.getDate()));
			endTime.setHours(eventEndTime.getHours());

			return {
				seriesId,
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

		const [minStartTime, maxStartTime, minEndTime, maxEndTime] = events.reduce(
			(array, currentEvent, index) => {
				if (index === 0) {
					array[0] = currentEvent.startTime;
					array[1] = currentEvent.startTime;
					array[2] = currentEvent.endTime;
					array[3] = currentEvent.endTime;
					return array;
				}

				array[0] = array[0] > currentEvent.startTime ? currentEvent.startTime : array[0];
				array[1] = array[1] < currentEvent.startTime ? currentEvent.startTime : array[1];
				array[2] = array[2] > currentEvent.endTime ? currentEvent.endTime : array[2];
				array[3] = array[3] < currentEvent.endTime ? currentEvent.endTime : array[3];
				return array;
			},
			[new Date(), new Date(), new Date(), new Date()]
		);

		const allEventsInThisTime = await Event.find({
			status: 'Active',
			startTime: { $gte: minStartTime, $lte: maxStartTime },
			endTime: { $gte: minEndTime, $lte: maxEndTime },
			pitchID: pitchID,
		}).lean();

		const isOverlapping = events.some((event) => {
			return allEventsInThisTime.some(
				(dbEvent) =>
					isWithinRange(dbEvent.startTime, event.startTime, event.endTime) &&
					isWithinRange(dbEvent.endTime, event.startTime, event.endTime)
			);
		});

		if (isOverlapping) {
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
