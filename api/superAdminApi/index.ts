import { Router } from "express";
import getSysytemPitch from "./get-pitch";
import analyticsRoute from "./analytics";




const superAdminRouter = Router();

superAdminRouter.get('/pitch', getSysytemPitch);
superAdminRouter.use('/analytics', analyticsRoute);
;


export default superAdminRouter;