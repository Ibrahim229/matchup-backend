import { Response } from 'express';
import Event from '../../../../db/event';
import { isEventTimeWithinRange } from '../../../../helpers/is-event-time-within-pitch';
import { EventType } from '../../../../interfaces/event_interface';

export const updateEvent = async (response: Response, event: Partial<EventType>, days: string[]) => {
	const eventStartTime = new Date(event.startTime);
	const eventEndTime = new Date(event.endTime);

	try {
		/**
		 * Update Single Event
		 */
		if (event.seriesId === null) {
			// check if there is event in that slot
			const slotEvent = await Event.find({
				status: 'Active',
				startTime: { $gte: eventStartTime },
				endTime: { $lte: eventEndTime },
			}).lean();

			if (!slotEvent[0]._id.equals(event._id)) {
				return response.status(400).json({ message: 'There is event within this selected slot' });
			}

			const updatedEvent = await Event.findByIdAndUpdate(event._id, {
				seriesId: event.seriesId,
				title: event.title,
				startTime: event.startTime,
				endTime: event.endTime,
				description: event.description,
				isAllDay: event.isAllDay,
				recurrenceRule: event.recurrenceRule,
				recurrenceException: event.recurrenceException,
			});

			if (updatedEvent instanceof Event) return response.json(updatedEvent);
			/**
			 * Update Series
			 */
		} else {
			const events = days.map((day) => {
				const startTime = new Date(day);
				const endTime = new Date(day);

				startTime.setHours(eventStartTime.getHours());
				endTime.setHours(eventEndTime.getHours());

				return {
					startTime,
					endTime,
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
			}).lean();

			const isOverlapping = allEventsInThisTime.some((event) => {
				return (
					isEventTimeWithinRange(event.startTime, event.endTime, eventStartTime, eventEndTime) &&
					event._id.equals(event._id) === false
				);
			});

			if (isOverlapping) {
				return response
					.status(400)
					.json({ message: 'There are events in this time period. Please change the repeat criteria.' });
			} else {
				// insert new events
				const updatedEvents = await Event.updateMany(
					{ seriesId: event.seriesId },
					{
						title: event.title,
						description: event.description,
						isAllDay: event.isAllDay,
						recurrenceRule: event.recurrenceRule,
						recurrenceException: event.recurrenceException,
					}
				);
				console.log({ updatedEvents });
				if (updatedEvents.acknowledged) return response.json([]);
			}
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: 'Internal server error' });
	}
};
