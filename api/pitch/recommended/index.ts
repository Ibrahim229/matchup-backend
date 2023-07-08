import { Router } from "express";
import getRecommend from "./get-recommend";
import addRecommend from "./add-recommend";
import deleteRecommend from "./delete-recommend";


const recommendedRouter = Router();

recommendedRouter.get('', getRecommend);
recommendedRouter.get('/:id', addRecommend);
recommendedRouter.delete('/:id', deleteRecommend);


export default recommendedRouter;