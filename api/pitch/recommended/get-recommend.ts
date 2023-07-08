
import Recommended from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const getRecommend = asyncHandler(async (req, res) => {
    var recomended = await Recommended.find();

    res.json(recomended)
})

export default getRecommend;


