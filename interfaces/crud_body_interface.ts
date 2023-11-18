import { EventType } from './event_interface';

export interface CRUDBody {
	requestType: RequestType;
	pitchId: string;
	repeatedEvents: string[];
	added: EventType[];
	changed: EventType[];
	deleted: EventType[];
}

export enum RequestType {
	Create = 'eventCreate',
	Change = 'eventChange',
	Remove = 'eventRemove',
}
