import asyncHandler from '../../api/middlewares/async-handler';
import { counter } from '../../db/counter';
import Event from '../../db/event';

export const addCount = () => {
	return asyncHandler(async (req, res) => {
		try {
			const startDate = new Date(req.body.startDate);

			const events = await Event.find({ fromMobile: true, startTime: { $gte: startDate } })
				.sort({ startTime: 1 })
				.lean();

			await counter.findByIdAndUpdate({ _id: 'events' }, { seq: 1 });
			const eventIds = events.map((event) => event._id);

			const updatedEvents = await Promise.all(
				eventIds.map((_id) => Event.findByIdAndUpdate(_id, { fromMobile: true }))
			);

			await Promise.all(updatedEvents.map((event) => event.save()));

			res.status(200).json({ success: true, message: 'Counts updated successfully.' });
		} catch (error) {
			console.error({ error });
			res.status(500).json({ success: false, message: error });
		}
	});
};
