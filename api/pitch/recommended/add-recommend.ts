
import Recommended from "../../../db/recommended";
import asyncHandler from "../../middlewares/async-handler";

const addRecommend = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {
        const { id } = req.params;
        await Recommended.create({ pitchID: id })

        res.json({ message: "Pitch add Successfully", })
    }
    else {

        res.status(401).json({ error: "Unauthorized" })

    }
})

export default addRecommend;


