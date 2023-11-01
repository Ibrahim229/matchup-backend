import { Types } from 'mongoose';
import { eventType } from './../db/event';

export interface EventType extends eventType {
	_id: Types.ObjectId;
}
