
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const updatePitch = asyncHandler(async (req, res) => {
    const { id } = req.params;

    var updateObject = {}
    if (req.files?.length ?? 0 > 0) {
        updateObject["pitchPic"] = (req.files as Express.MulterS3.File[]).map((file) => file.location);
    }

    if (req.body.availabletyList) {
        updateObject["availabletyList"] = JSON.parse(req.body.availabletyList);
    }

    if (req.body.location) {
        updateObject["location"] = JSON.parse(req.body.location)
    }

    const pitch = await Pitch.findByIdAndUpdate(id, { ...req.body, ...updateObject }, { new: true })


    res.json({ message: "Pitch updated Successfully", pitchDetails: pitch })
})

export default updatePitch;


