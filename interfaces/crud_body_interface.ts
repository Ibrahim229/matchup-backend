import { EventType } from './event_interface';

export interface CRUDBody {
	pitchId: string;
	repeatedEvents: string[];
	added: EventType[];
	changed: EventType[];
	deleted: EventType[];
}
