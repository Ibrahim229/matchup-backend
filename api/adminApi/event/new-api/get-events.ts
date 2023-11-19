import Event from '../../../../db/event';
import { EventType } from '../../../../interfaces/event_interface';
import asyncHandler from '../../../middlewares/async-handler';

export const getEvents = asyncHandler(async (request, response) => {
	if (request.user?.role == 'Admin') {
		const { pitchId, StartDate, EndDate }: { pitchId: string; StartDate: string; EndDate: string } = request.body;
		const startTime = new Date(StartDate);
		const endTime = new Date(EndDate);

		try {
			const events = await Event.find({
				pitchID: pitchId,
				status: 'Active',
				$and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }],
			});

			const uniqueEvents = removeDuplicateEvents(events);
			return response.status(200).json(uniqueEvents);
		} catch (error) {
			console.error({ error });
			return response.status(500).json({ error: 'Internal server error' });
		}
	} else {
		return response.status(401).json({ error: 'Unauthorized' });
	}
});

const removeDuplicateEvents = (events: EventType[]) => {
	const seriesIds: Record<string, boolean> = {};
	const filteredEvents: EventType[] = [];

	for (const currentEvent of events)
		if (currentEvent.seriesId === null || seriesIds[String(currentEvent.seriesId)] === undefined) {
			seriesIds[String(currentEvent.seriesId)] = true;
			filteredEvents.push(currentEvent);
		}

	return filteredEvents;
};
