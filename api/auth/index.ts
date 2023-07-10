import { Router } from "express";
import signup from "./signup";
import signUpValidate from "../../validations/auth/sign_up_validation";
import login from "./login";
import verifyOTP from "./verify-otp";
import resetPassRouter from "./reset-passowrd";
import verifyToken from "./verify-token";
import passport from "passport";

const authRouter = Router();

authRouter.post('/signup', signUpValidate, signup);
authRouter.post('/login', login);
authRouter.get('/verify-otp/:phoneNumber/:otp', verifyOTP);
authRouter.use('/reset-password', resetPassRouter);
authRouter.get('/verify-token', passport.authenticate('jwt', { session: false }), verifyToken);

export default authRouter;