import { WithId } from 'mongodb';
import mongoose, { InferSchemaType, Schema } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

const RecommendedSchema = new Schema({
    pitch: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true, autopopulate: true, index: { unique: true } },
}).plugin(autopopulate.default);

export type recommendedType = WithId<InferSchemaType<typeof RecommendedSchema>>;

const Recommended = mongoose.model('Recommended', RecommendedSchema);

export default Recommended;