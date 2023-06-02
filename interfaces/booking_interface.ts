import { Types } from 'mongoose';


interface bookingDetails {
    bookTime: IPeriod
    pitchID: Types.ObjectId
    bookingStatus: String
}
export default interface IBooking {
    userID: Types.ObjectId,
    bookingDetails: bookingDetails
}


