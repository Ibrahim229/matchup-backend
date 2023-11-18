import { Router } from 'express';
import getUserAnalytics from './user-analytics';
import { getUserReports } from './user-reports';

const analyticsRoute = Router();

analyticsRoute.get('/getUserAnalytics', getUserAnalytics);
analyticsRoute.post('/getUserReports', getUserReports);

export default analyticsRoute;
