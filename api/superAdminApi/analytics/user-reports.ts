import { isValidObjectId } from 'mongoose';
import Event from '../../../db/event';
import asyncHandler from '../../middlewares/async-handler';

export const getUserReports = asyncHandler(async (request, response) => {
	const { search, startDate, endDate, status }: Record<string, string> = request.body;

	const startTime = new Date(startDate);
	const endTime = new Date(endDate);
	const trimmedSearchText = search.trim();

	if (request.user?.role == 'superAdmin') {
		try {
			const result = await Event.aggregate([
				{
					$match: {
						status: status,
						startTime: { $gte: startTime },
						endTime: { $lte: endTime },
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{
					$unwind: {
						path: '$user',
					},
				},
				{
					$lookup: {
						from: 'pitches',
						localField: 'pitchID',
						foreignField: '_id',
						as: 'pitch',
					},
				},
				{
					$unwind: {
						path: '$pitch',
					},
				},
				{
					$match: {
						'user.role': 'User',
						$or: [
							{ 'user._id': isValidObjectId(trimmedSearchText) ? trimmedSearchText : null },
							{ 'user.fullName': !isValidObjectId(trimmedSearchText) ? { $regex: trimmedSearchText } : null },
							{ 'pitch.name': !isValidObjectId(trimmedSearchText) ? { $regex: trimmedSearchText } : null },
						],
					},
				},
				{
					$project: {
						_id: 0,
						count: 1,
						fullName: '$user.fullName',
						userId: '$user._id',
						email: '$user.email',
						phoneNumber: '$user.phoneNumber',
						status: 1,
						field: '$pitch.name',
						playersNumber: '$pitch.playersNumber',
						date: {
							start: '$startTime',
							end: '$endTime',
						},
						ratePerHour: { $toInt: '$pitch.price' },
					},
				},
				{
					$addFields: {
						payment: {
							$multiply: [{ $divide: [{ $subtract: ['$date.end', '$date.start'] }, 3600000] }, '$ratePerHour'],
						},
					},
				},
				{
					$group: {
						_id: null,
						items: { $push: '$$ROOT' },
					},
				},
				{
					$project: {
						_id: 0,
					},
				},
			]);

			return response.json(result[0]);
		} catch (error) {
			console.error(error);
			return response.status(500).json({ message: 'Internal server error' });
		}
	} else {
	}
});
