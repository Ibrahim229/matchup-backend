import { Router } from "express";
import passport from "passport";
import generateUser from "./generate-user";
import adminLogin from "./login";
import getAdminPitch from "./admin-pitch";
import getAdminUsers from "./admin-users";
import deleteUser from "./delete-user";
import changePass from "./change-pass";


const adminRouter = Router();

adminRouter.get('/generateUser/:userName', passport.authenticate('jwt', { session: false }), generateUser);
adminRouter.post('/login', adminLogin);
adminRouter.get('/adminPitch', passport.authenticate('jwt', { session: false }), getAdminPitch);
adminRouter.get('/getAdminUsers', passport.authenticate('jwt', { session: false }), getAdminUsers);
adminRouter.delete('/deleteUser/:id', passport.authenticate('jwt', { session: false }), deleteUser);
adminRouter.put('/changePass', passport.authenticate('jwt', { session: false }), changePass);


export default adminRouter;