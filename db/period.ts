import { InferSchemaType, Schema, model } from "mongoose";

export const periodSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false,
        required: true
    }
});

export type PeriodType = InferSchemaType<typeof periodSchema>;


const Period = model('Period', periodSchema);

export default Period;
