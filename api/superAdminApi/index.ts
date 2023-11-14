import { Router } from 'express';
import { addCount } from './add-count';
import analyticsRoute from './analytics';
import getSystemPitch from './get-pitch';

const superAdminRouter = Router();

superAdminRouter.get('/pitch', getSystemPitch);
superAdminRouter.use('/analytics', analyticsRoute);
superAdminRouter.post('/addCount', addCount);

export default superAdminRouter;
