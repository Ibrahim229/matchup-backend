
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const createPitch = asyncHandler(async (req, res) => {
    if (req.user?.role == "Admin") {
        var adminId = req.user?._id.toString()
        var pitchPic = (req.files as Express.MulterS3.File[]).map((file) => file.location);

        var location = JSON.parse(req.body.location)
        const pitch = await Pitch.create({
            ...req.body, adminId, pitchPic, location
        },)

        res.json({ message: "Pitch created Successfully", })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default createPitch;


