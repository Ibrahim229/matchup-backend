import { Router } from 'express';
import cancelEvent from './cancel-event';
import createEvent from './create-event';
import getActiveEvent from './get-active-event';
import { eventsActions } from './new-api/events-actions';
import { getEvents } from './new-api/get-events';

const eventRouter = Router();

eventRouter.get('/:pitchID', getActiveEvent);
eventRouter.post('/createEvent/:pitchID', createEvent);
eventRouter.get('/cancelEvent/:id', cancelEvent);

// new APIS
eventRouter.post('/scheduler', getEvents);
eventRouter.post('/scheduler/actions', eventsActions);

export default eventRouter;
