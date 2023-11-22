import { Document } from 'mongoose';
import cron from 'node-cron';
import { connectionPromise } from '../db';
import Event, { eventType } from '../db/event';

connectionPromise.then(() => {
	cron.schedule('*/1 * * * *', async () => {
		try {
			var rows = await Event.find({ status: 'Active' });
			for (const row of rows) {
				await processRow(row);
			}

			console.log('Function applied to all rows.');
		} catch (error) {
			console.error(error);
		}
	});
});

const processRow = async (row: Document<unknown, {}, eventType> & eventType) => {
	const now: Date = new Date();
	const utcNow = new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds(),
			now.getUTCMilliseconds()
		)
	);
	const startDate = row.startTime;
	const entDate = row.endTime;
	if (isDifferenceLessThanDay(utcNow, startDate) && row.fromMobile == true && row.canCancel == true) {
		console.log('updated event can cancel');
		await row.updateOne({ canCancel: false });
	}
	if (utcNow > entDate && row.status == 'Active') {
		console.log('updated event status');
		await row.updateOne({ status: 'OutDated' });
	}
};

const isDifferenceLessThanDay = (date1: Date, date2: Date): boolean => {
	return date1.getTime() < date2.getTime() && date2.getTime() - date1.getTime() < 4 * 60 * 60 * 1000;
};
