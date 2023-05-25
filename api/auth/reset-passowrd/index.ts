
import { Router } from "express";
import sendOTP from "./send-otp";
import verifyOTP from "./verify-otp";
import resetPassword from "./reset-password";

const resetPassRouter = Router();

resetPassRouter.get('/send-otp/:phoneNumber', sendOTP);
resetPassRouter.get('/verify-otp/:phoneNumber/:otp', verifyOTP);
resetPassRouter.post('/:token', resetPassword);

export default resetPassRouter;