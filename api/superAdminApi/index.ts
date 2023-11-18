import { Router } from 'express';
import analyticsRoute from './analytics';
import getSystemPitch from './get-pitch';

const superAdminRouter = Router();

superAdminRouter.get('/pitch', getSystemPitch);
superAdminRouter.use('/analytics', analyticsRoute);

export default superAdminRouter;
