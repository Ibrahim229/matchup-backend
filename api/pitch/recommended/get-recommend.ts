
import Recommended, { recommendedType } from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const getRecommend = asyncHandler(async (req, res) => {
    var recomended: recommendedType[] = await Recommended.find();
    var recommendedWithoutNull = recomended.filter((element) => element.pitch != null)

    res.json(recommendedWithoutNull)
})

export default getRecommend;


