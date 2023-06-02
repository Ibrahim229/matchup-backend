
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const deletePitch = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await Pitch.findByIdAndDelete(id)

    res.json({ message: "Pitch deleted Successfully", deleted: true })
})

export default deletePitch;