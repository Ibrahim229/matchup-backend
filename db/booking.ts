import mongoose, { InferSchemaType, Schema, Types } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

const BookingSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    periodIDs: [{ type: Schema.Types.ObjectId, ref: 'Period', required: true, autopopulate: true }],
    pitchID: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true, autopopulate: true },
    bookingStatus: { type: String, required: true, enum: ["Active", "OutDated", "Canceled", "OnHold"], default: "Active" }

}).plugin(autopopulate.default);


export type BookingType = InferSchemaType<typeof BookingSchema>;

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;