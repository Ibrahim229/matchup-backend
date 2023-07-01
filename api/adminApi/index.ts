import { Router } from "express";
import passport from "passport";
import generateUser from "./generate-user";
import adminLogin from "./login";
import getAdminPitch from "./admin-pitch";


const adminRouter = Router();

adminRouter.get('/generateUser/:userName', passport.authenticate('jwt', { session: false }), generateUser);
adminRouter.post('/login', adminLogin);
adminRouter.get('/adminPitch', getAdminPitch);


export default adminRouter;