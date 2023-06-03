import cron from 'node-cron';
import Booking from '../db/booking';
import { connectionPromise } from '../db';

connectionPromise.then(() => {
    cron.schedule('*/1 * * * *', async () => {
        try {
            var rows = await Booking.find().populate('periodID').exec();
            for (const row of rows) {

                await processRow(row);
            }

            console.log('Function applied to all rows.');

        } catch (error) {
            console.error(error);
        }
    });
})


const processRow = async (row) => {
    var currentTime = new Date();
    var bookingEndTime = row.periodID?.endTime ?? new Date()
    if (row.bookingStatus == "Active" && currentTime > bookingEndTime) {
        await row.updateOne({ bookingStatus: "OutDated" }, { new: true })
    }

};

