import { Response } from 'express';
import Event from '../../../../db/event';
import { EventType } from '../../../../interfaces/event_interface';

export const deleteEvent = async (response: Response, event: Partial<EventType>) => {
	try {
		const cancelledEvent = await Event.findByIdAndUpdate(event._id, { status: 'Cancelled' });

		if (cancelledEvent) {
			response.json({ message: 'Event cencelled successfully' });
		} else {
			response.status(404).json({ message: 'Event not found' });
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: 'Internal server error' });
	}
};
