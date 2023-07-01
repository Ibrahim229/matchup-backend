import { InferSchemaType, Schema, model, Types } from "mongoose";
import { WithId } from 'mongodb';
import * as autopopulate from 'mongoose-autopopulate';


const PitchSchema = new Schema({
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
    availabletyList: [{ type: Schema.Types.ObjectId, ref: 'Period', autopopulate: true, }],
    pitchPic: { type: [String], required: true }
}).plugin(autopopulate.default)



export type PitchType = WithId<InferSchemaType<typeof PitchSchema>>;

const Pitch = model('Pitch', PitchSchema);

export default Pitch;