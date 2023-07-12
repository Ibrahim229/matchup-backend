import { Router } from "express";
import passport from "passport";
import createEvent from "./create-event";
import cancelEvent from "./cancel-event";
import getActiveEvent from "./get-active-event";



const eventRouter = Router();

eventRouter.get('/:pitchID', getActiveEvent);
eventRouter.post('/createEvent/:pitchID', createEvent);
eventRouter.get('/cancelEvent/:id', cancelEvent);



export default eventRouter;