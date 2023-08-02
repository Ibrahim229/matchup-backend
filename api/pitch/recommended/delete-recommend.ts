
import Recommended from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const deleteRecommend = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {

        const { id } = req.params;
        var deleteRecommendation = await Recommended.findByIdAndDelete(id)
        console.log("delete recommendation", deleteRecommendation)
        if (deleteRecommendation)
            res.json({ message: "Pitch deleted Successfully", })
        else
            res.status(404).json({ error: "Not Found" })
    }
    else {

        res.status(401).json({ error: "Unauthorized" })

    }
})

export default deleteRecommend;


