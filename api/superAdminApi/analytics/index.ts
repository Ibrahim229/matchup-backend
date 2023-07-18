import { Router } from "express";
import getUserAnalytics from "./user-analytics";




const analyticsRoute = Router();

analyticsRoute.get('/getUserAnalytics', getUserAnalytics);
;


export default analyticsRoute;