import { Router } from 'express';
import passport from 'passport';
import signUpValidate from '../../validations/auth/sign_up_validation';
import { createAdmin } from './create-admin';
import login from './login';
import resetPassRouter from './reset-passowrd';
import signup from './signup';
import verifyOTP from './verify-otp';
import verifyToken from './verify-token';

const authRouter = Router();

authRouter.post('/create-admin', signUpValidate, createAdmin);

authRouter.post('/signup', signUpValidate, signup);
authRouter.post('/login', login);
authRouter.get('/verify-otp/:phoneNumber/:otp', verifyOTP);
authRouter.use('/reset-password', resetPassRouter);
authRouter.get('/verify-token', passport.authenticate('jwt', { session: false }), verifyToken);

export default authRouter;
