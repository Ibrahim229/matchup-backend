import { Router } from "express";
import getRecommend from "./get-recommend";
import addRecommend from "./add-recommend";
import deleteRecommend from "./delete-recommend";
import passport from "passport";


const recommendedRouter = Router();

recommendedRouter.get('', getRecommend);
recommendedRouter.get('/:id', passport.authenticate('jwt', { session: false }), addRecommend);
recommendedRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteRecommend);


export default recommendedRouter;