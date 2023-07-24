import { Router } from 'express';
import authRouter from './auth';
import pitchRouter from './pitch';
import passport from 'passport';
import bookingRouter from './booking';
import adminRouter from './adminApi';
import profileRouter from './profile';
import superAdminRouter from './superAdminApi';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/pitch', pitchRouter);
apiRouter.use('/book', passport.authenticate('jwt', { session: false }), bookingRouter);
apiRouter.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);
apiRouter.use('/superAdmin', passport.authenticate('jwt', { session: false }), superAdminRouter);

export default apiRouter;