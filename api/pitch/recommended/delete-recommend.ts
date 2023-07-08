
import Recommended from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const deleteRecommend = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {

        const { id } = req.params;
        await Recommended.findOneAndDelete({pitchID:id})

        res.json({ message: "Pitch deleted Successfully", })
    }
    else {

        res.status(401).json({ error: "Unauthorized" })

    }
})

export default deleteRecommend;


