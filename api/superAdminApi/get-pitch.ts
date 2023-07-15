
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const getSysytemPitch = asyncHandler(async (req, res) => {
    if (req.user?.role == "superAdmin") {
        const pitches = await Pitch.find().select('name description price pitchPic')

        res.json(pitches)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
    return

})

export default getSysytemPitch;