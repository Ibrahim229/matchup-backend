import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import Event from '../../../db/event';
import asyncHandler from '../../middlewares/async-handler';

type Sort = 'asc' | 'desc' | null;

export const getUserReports = asyncHandler(async (request, response) => {
	const {
		search,
		startDate,
		endDate,
		status,
		countOrder,
		startDateOrder,
		rateOrder,
		paymentOrder,
	}: {
		search: string;
		startDate: string;
		endDate: string;
		status: string;
		countOrder: Sort;
		startDateOrder: Sort;
		rateOrder: Sort;
		paymentOrder: Sort;
	} = request.body;

	const startTime = new Date(startDate);
	const endTime = new Date(endDate);
	const trimmedSearchText = search.trim();

	if (request.user?.role == 'superAdmin') {
		try {
			const result = await Event.aggregate()
				.match({
					status: status,
					startTime: { $gte: startTime },
					endTime: { $lte: endTime },
				})
				.lookup({
					from: 'users',
					localField: 'user',
					foreignField: '_id',
					as: 'user',
				})
				.unwind({
					path: '$user',
				})
				.lookup({
					from: 'pitches',
					localField: 'pitchID',
					foreignField: '_id',
					as: 'pitch',
				})
				.unwind({
					path: '$pitch',
				})
				.match({
					'user.role': 'User',
					$or: [
						{ 'user._id': isValidObjectId(trimmedSearchText) ? new ObjectId(trimmedSearchText) : null },
						{ 'user.fullName': { $regex: new RegExp(trimmedSearchText, 'ig') } },
						{ 'pitch.name': { $regex: new RegExp(trimmedSearchText, 'ig') } },
					],
				})
				.project({
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
				})
				.addFields({
					payment: {
						$multiply: [
							{ $round: [{ $divide: [{ $subtract: ['$date.end', '$date.start'] }, 3600000] }, 0] },
							'$ratePerHour',
						],
					},
				})
				.sort({
					...(countOrder ? { count: countOrder } : {}),
					...(rateOrder ? { ratePerHour: rateOrder } : {}),
					...(paymentOrder ? { payment: paymentOrder } : {}),
					'date.start': startDateOrder ?? 'desc',
				})
				.group({
					_id: null,
					items: { $push: '$$ROOT' },
				})
				.project({
					_id: 0,
				});

			return response.json(result[0]);
		} catch (error) {
			console.error(error);
			return response.status(500).json({ message: 'Internal server error' });
		}
	} else {
	}
});
