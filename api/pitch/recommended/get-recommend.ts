
import Recommended, { recommendedType } from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const getRecommend = asyncHandler(async (req, res) => {
    var recomended: recommendedType[] = await Recommended.find();
    console.log("without filter recommended", recomended)
    var recommendedWithoutNull = recomended.filter((element) => element.pitch != null)
    console.log("with filter recommended", recomended)
    res.json(recommendedWithoutNull)
})

export default getRecommend;


