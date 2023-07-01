
import Period, { PeriodType } from "../../db/period";
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const createPitch = asyncHandler(async (req, res) => {
    var adminId = req.user?._id.toString()
    var pitchPic = (req.files as Express.MulterS3.File[]).map((file) => file.location);
    var periodList = JSON.parse(req.body.availabletyList) as [];
    var availabletyList = await Promise.all(periodList.map(async (item): Promise<any> => {
        var newPeriod = await Period.create(item)
        return newPeriod._id.toString()
    }))
    var location = JSON.parse(req.body.location)
    const pitch = await Pitch.create({
        ...req.body, adminId, pitchPic, availabletyList, location
    },)

    res.json({ message: "Pitch created Successfully", })
})

export default createPitch;


