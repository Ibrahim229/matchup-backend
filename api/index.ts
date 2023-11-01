import { Router } from 'express';
import passport from 'passport';
import adminRouter from './adminApi';
import authRouter from './auth';
import bookingRouter from './booking';
import pitchRouter from './pitch';
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
