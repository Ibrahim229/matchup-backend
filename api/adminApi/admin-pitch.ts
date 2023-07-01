
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const getAdminPitch = asyncHandler(async (req, res) => {
    const adminId = req.user?._id.toString()
    const pitches = await Pitch.find({ adminId })

    res.json(pitches)

})

export default getAdminPitch;