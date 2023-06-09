import { Router } from 'express';
import authRouter from './auth';
import pitchRouter from './pitch';
import passport from 'passport';
import bookingRouter from './booking';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/pitch', passport.authenticate('jwt', { session: false }), pitchRouter);
apiRouter.use('/book', passport.authenticate('jwt', { session: false }), bookingRouter);

export default apiRouter;