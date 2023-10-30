import { CRUDBody } from '../../../../interfaces/crud_body_interface';
import asyncHandler from '../../../middlewares/async-handler';
import { createNewEvent } from './create-new-event';
import { createNewEvents } from './create-new-events';
import { deleteEvent } from './delete-event';
import { updateEvent } from './update-event';

export const eventsActions = asyncHandler(async (request, response) => {
	if (request.user?.role == 'Admin') {
		const body: CRUDBody = request.body;

		switch (true) {
			/**
			 * Create New Event
			 **/
			case body.added.length !== 0 && body.changed.length === 0 && body.deleted.length === 0: {
				const repeatedEvents = body.repeatedEvents;

				if (repeatedEvents.length === 0) {
					// create 1 event
					return createNewEvent(request, response, body.pitchId, body.added[0]);
				} else {
					// create multiple events
					return createNewEvents(request, response, body.pitchId, body.added[0], repeatedEvents);
				}
			}

			/**
			 * Update an Event
			 **/
			case body.changed.length !== 0 && body.added.length === 0 && body.deleted.length === 0: {
				return updateEvent(response, body.changed[0]);
			}

			/**
			 * Delete an Event
			 **/
			case body.deleted.length !== 0 && body.changed.length === 0 && body.added.length === 0:
				return deleteEvent(response, body.deleted[0]);
		}
	} else {
		return response.status(401).json({ message: 'Unauthorized' });
	}
});
