import { InferSchemaType, Schema, model, Types } from "mongoose";

import { periodSchema } from "./period";

const PitchSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    description: { type: String, rqeuired: true, },
    price: { type: String, rqeuired: true, },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: { type: '2dsphere', sparse: true }
        },

    },
    groundType: { type: String, required: true, enum: ["Grass", "Tartan"] },
    pitchSetting: { type: String, required: true, enum: ["Indoor", "Outdoor"] },
    playersNumber: {
        type: Number, required: true, max: 11
    },
    availabletyList: [{ type: Schema.Types.ObjectId, ref: 'Period' }],
    pitchPic: { type: [String], required: true }
});



export type PitchType = InferSchemaType<typeof PitchSchema>;

const Pitch = model('Pitch', PitchSchema);

export default Pitch;