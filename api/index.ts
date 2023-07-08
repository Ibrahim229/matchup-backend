import { Router } from 'express';
import authRouter from './auth';
import pitchRouter from './pitch';
import passport from 'passport';
import bookingRouter from './booking';
import adminRouter from './adminApi';
import profileRouter from './profile';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/pitch', passport.authenticate('jwt', { session: false }), pitchRouter);
apiRouter.use('/book', passport.authenticate('jwt', { session: false }), bookingRouter);
apiRouter.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);

export default apiRouter;