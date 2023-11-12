import { InferSchemaType, Schema, model } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';
import { counter } from './counter';

export const eventSchema = new Schema({
	count: {
		type: Number,
		default: null,
	},
	seriesId: {
		type: Schema.Types.ObjectId,
		default: null,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		autopopulate: { select: 'fullName phoneNumber email' },
	},
	pitchID: { type: Schema.Types.ObjectId, ref: 'Pitch', required: true, autopopulate: true },
	title: {
		type: String,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	fromMobile: {
		type: Boolean,
		default: false,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ['Active', 'OutDated', 'Cancelled'],
		default: 'Active',
	},
	description: {
		type: String,
		default: null,
	},
	isAllDay: {
		type: Boolean,
		default: false,
	},
	recurrenceRule: {
		type: String,
		default: null,
	},
	recurrenceException: {
		type: String,
		default: null,
	},
}).plugin(autopopulate.default);

eventSchema.pre('save', async function (next) {
	const event = this;

	if (event.fromMobile === true) {
		try {
			const { seq } = await counter.findByIdAndUpdate({ _id: 'events' }, { $inc: { seq: 1 } }, { upsert: true }).lean();
			event.count = seq;
			next();
		} catch (error) {
			return next(error);
		}
	}

	next();
});

const Event = model('Event', eventSchema);
export default Event;
export type eventType = InferSchemaType<typeof eventSchema>;
