
import Period, { PeriodType } from "../../db/period";
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const createPitch = asyncHandler(async (req, res) => {
    var adminId = req.user?._id.toString()
    var pitchPic = (req.files as Express.MulterS3.File[]).map((file) => file.location);
    console.log("Avaialble list",req.body.availabletyList)

    var location = JSON.parse(req.body.location)
    const pitch = await Pitch.create({
        ...req.body, adminId, pitchPic, location
    },)

    res.json({ message: "Pitch created Successfully", })
})

export default createPitch;


