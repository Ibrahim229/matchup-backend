import cron from 'node-cron';
// import Booking from '../db/booking';
import { connectionPromise } from '../db';
import Event from '../db/event';

connectionPromise.then(() => {
    cron.schedule('*/1 * * * *', async () => {
        try {
            var rows = await Event.find({ status: "Active" });
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
    const previousDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const startDate = row.startDate
    if (isDifferenceLessThanDay(startDate, previousDay) && row.fromMobile == true && row.canCancel == true) {
        console.log("updated event can cancel")
        await row.updateOne({ canCancel: false })
    }
    if (now > startDate) {
        console.log("updated event status")
        await row.updateOne({ status: "OutDated" })
    }
};

const isDifferenceLessThanDay = (date1: Date, date2: Date): boolean => {
    const differenceInMillis = date1.getTime() - date2.getTime();
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    return differenceInMillis < millisecondsInDay;
}

