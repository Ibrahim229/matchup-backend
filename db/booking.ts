import mongoose, { InferSchemaType, Schema, Types } from 'mongoose';
import { periodSchema } from './period'

const BookingSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    periodID: { type: Schema.Types.ObjectId, ref: 'Period', required: true },
    pitchID: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true },
    bookingStatus: { type: String, required: true, enum: ["Active", "OutDated", "Canceled", "OnHold"], default: "Active" }

});


export type BookingType = InferSchemaType<typeof BookingSchema>;

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;