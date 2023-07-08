
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const deletePitch = asyncHandler(async (req, res) => {
    if (req.user?.role == "Admin") {
        const { id } = req.params;

        await Pitch.findByIdAndDelete(id)

        res.json({ message: "Pitch deleted Successfully", deleted: true })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default deletePitch;