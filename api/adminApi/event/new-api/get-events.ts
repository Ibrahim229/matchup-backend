import Event from '../../../../db/event';
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
				startTime: { $gte: startTime },
				endTime: { $lte: endTime },
			});
			return response.status(200).json(events);
		} catch (error) {
			console.error({ error });
			return response.status(500).json({ error: 'Internal server error' });
		}
	} else {
		return response.status(401).json({ error: 'Unauthorized' });
	}
});
