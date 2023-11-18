import { Types } from 'mongoose';
import { createNewEvent } from '../adminApi/event/new-api/create-new-event';
import asyncHandler from '../middlewares/async-handler';

const createbook = asyncHandler(async (request, response) => {
	if (request.user?.role == 'User') {
		const userID = request.user?._id.toString() as unknown as Types.ObjectId;
		const pitchID = request.params.pitchID as string;
		const { startT, endT } = request.body;

		const startTime = new Date(startT);
		const endTime = new Date(endT);

		const event = {
			user: userID,
			pitchID: pitchID as unknown as Types.ObjectId,
			title: 'From Matchup app',
			startTime,
			endTime,
			fromMobile: true,
		};

		return createNewEvent(request, response, pitchID, event);
	} else {
		return response.status(401).json({ error: 'Unauthorized' });
	}
});

export default createbook;
