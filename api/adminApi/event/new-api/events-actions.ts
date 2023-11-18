import { CRUDBody, RequestType } from '../../../../interfaces/crud_body_interface';
import asyncHandler from '../../../middlewares/async-handler';
import { createNewEvent } from './create-new-event';
import { createNewEvents } from './create-new-events';
import { deleteEvent } from './delete-event';
import { updateEvent } from './update-event';

export const eventsActions = asyncHandler(async (request, response) => {
	if (request.user?.role == 'Admin') {
		const body: CRUDBody = request.body;

		switch (body.requestType) {
			case RequestType.Create: {
				const repeatedEvents = body.repeatedEvents;

				if (repeatedEvents.length === 0) {
					return createNewEvent(request, response, body.pitchId, body.added[0]);
				} else {
					return createNewEvents(request, response, body.pitchId, body.added[0], repeatedEvents);
				}
			}

			case RequestType.Change:
				{
					if (body.changed.length && body.added.length === 0)
						return updateEvent(response, body.changed[0], body.repeatedEvents);

					if (body.added.length && body.changed.length)
						return updateEvent(
							response,
							{ ...body.added[0], seriesId: null, recurrenceException: null, recurrenceRule: null },
							body.repeatedEvents
						);
				}
				break;

			case RequestType.Remove:
				{
					if (body.deleted.length) return deleteEvent(response, body.deleted[0]);
					if (body.changed.length) return deleteEvent(response, { ...body.changed[0], seriesId: null }, true);
				}
				break;
		}
	} else {
		return response.status(401).json({ message: 'Unauthorized' });
	}
});
