import { Router } from "express";
import getSysytemPitch from "./get-pitch";




const superAdminRouter = Router();

superAdminRouter.get('/pitch', getSysytemPitch);
;


export default superAdminRouter;