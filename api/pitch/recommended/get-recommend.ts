
import Recommended from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const getRecommend = asyncHandler(async (req, res) => {
    var recomended = await Recommended.where("pitch").ne(null);

    res.json(recomended)
})

export default getRecommend;


