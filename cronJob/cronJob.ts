import cron from 'node-cron';
import Booking from '../db/booking';
import { connectionPromise } from '../db';

connectionPromise.then(() => {
    cron.schedule('*/1 * * * *', async () => {
        try {
            var rows = await Booking.find();
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
    const now: Date = new Date();
    var latestTime: Date = row.periodIDs.reduce((latest, current) => {
        if (!latest || current.endTime > latest.endTime) {
            return current  ;
        }
        return latest;
    }, undefined)?.endTime;
    if (row.bookingStatus == "Active" && now > latestTime) {
        console.log("updated Row")
        await row.updateOne({ bookingStatus: "OutDated" }, { new: true })
    }

};

