
import Pitch, { PitchType } from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const deletePitchImage = asyncHandler(async (req, res) => {
    if (req.user?.role == "Admin") {
        const { id } = req.params;
        const imageURL: string = req.body.imageUrl;

        var pitch: PitchType | null | undefined = await Pitch.findById(id)

        var pitchPic = [...(pitch?.pitchPic ?? [])];
        var index = pitchPic?.indexOf(imageURL)
        pitchPic.splice(index, 1)
        await Pitch.findByIdAndUpdate(id,{pitchPic})
        res.json({ message: "Pitch Image deleted Successfully", deleted: true })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default deletePitchImage;