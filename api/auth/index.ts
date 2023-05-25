import { Router } from "express";
import signup from "./signup";
import signUpValidate from "../../validations/auth/sign_up_validation";
import login from "./login";
import verifyOTP from "./verify-otp";
import resetPassRouter from "./reset-passowrd";

const authRouter = Router();

authRouter.post('/signup', signUpValidate, signup);
authRouter.post('/login', login);
authRouter.get('/verify-otp/:phoneNumber/:otp', verifyOTP);
authRouter.use('/reset-password', resetPassRouter);

export default authRouter;