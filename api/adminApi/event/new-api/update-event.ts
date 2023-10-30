import { Response } from 'express';
import { ObjectId } from 'mongodb';
import Event from '../../../../db/event';
import { EventType } from '../../../../interfaces/event_interface';

export const updateEvent = async (response: Response, event: Partial<EventType>) => {
	const startTime = new Date(event.startTime);
	const endTime = new Date(event.endTime);

	try {
		// check if there is event in that slot
		const slotEvent = await Event.find({ status: 'Active', $and: [{ startTime }, { endTime }] }).lean();
		if (slotEvent.length) {
			return response.status(400).json({ message: 'There is event within this selected slot' });
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			{
				_id: event._id ?? new ObjectId(),
			},
			{
				user: event.user?._id,
				pitchID: event.pitchID?._id,
				title: event.title,
				startTime: event.startTime,
				endTime: event.endTime,
				description: event.description,
				isAllDay: event.isAllDay,
				recurrenceRule: event.recurrenceRule,
				recurrenceException: event.recurrenceException,
			},
			{ upsert: true, new: true }
		);

		if (updatedEvent instanceof Event) return response.json(updatedEvent);
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: 'Internal server error' });
	}
};
