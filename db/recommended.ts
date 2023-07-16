import mongoose, { Schema } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

const RecommendedSchema = new Schema({
    pitch: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true, autopopulate: true, index: { unique: true } },
}).plugin(autopopulate.default);


const Recommended = mongoose.model('Recommended', RecommendedSchema);

export default Recommended;