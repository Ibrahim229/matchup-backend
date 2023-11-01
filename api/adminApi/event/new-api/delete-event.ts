import { Response } from 'express';
import Event from '../../../../db/event';
import { EventType } from '../../../../interfaces/event_interface';

export const deleteEvent = async (response: Response, event: Partial<EventType>, deleteEventFormSeries = false) => {
	try {
		/**
		 * Cancel Event from series */
		if (deleteEventFormSeries) {
			const cancelledEvent = await Event.findByIdAndUpdate(event._id, { status: 'Cancelled' }).lean();
			if (cancelledEvent) {
				response.json({ message: 'Event cencelled successfully' });
			} else {
				response.status(404).json({ message: 'Event not found' });
			}
		} else if (event.seriesId === null) {
			/**
			 * Cancel Single Event */
			const cancelledEvent = await Event.findByIdAndUpdate(event._id, { status: 'Cancelled' }).lean();

			if (cancelledEvent) {
				response.json({ message: 'Event cencelled successfully' });
			} else {
				response.status(404).json({ message: 'Event not found' });
			}
		} else {
			/**
			 * Cancel Series */
			const cancelledEvents = await Event.updateMany({ seriesId: event.seriesId }, { status: 'Cancelled' }).lean();

			if (cancelledEvents) {
				response.json({ message: 'Series cencelled successfully' });
			} else {
				response.status(404).json({ message: 'Series not found' });
			}
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: 'Internal server error' });
	}
};
