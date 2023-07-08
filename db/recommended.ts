import mongoose, { InferSchemaType, Schema, Types } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

const RecommendedSchema = new Schema({
    pitchID: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true, autopopulate: true },
}).plugin(autopopulate.default);


const Recommended= mongoose.model('Recommended', RecommendedSchema);

export default Recommended;