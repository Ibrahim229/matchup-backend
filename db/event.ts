import { InferSchemaType, Schema, model } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const eventSchema = new Schema({
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

export type eventType = InferSchemaType<typeof eventSchema>;

const Event = model('Event', eventSchema);

export default Event;
