
import Pitch, { PitchType } from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const updateCloseTime = asyncHandler(async (req, res) => {
    if (req.user?.role == "Admin") {
        const { id } = req.params;
        const { openT, closeT } = req.body
        var now = new Date();
        var openTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            openT.getHours(),
            openT.getMinutes(),
            openT.getSeconds(),
            openT.getMilliseconds()
        );
        var closeTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            closeT.getHours(),
            closeT.getMinutes(),
            closeT.getSeconds(),
            closeT.getMilliseconds()
        );
        const pitch = await Pitch.findByIdAndUpdate(id, { openTime, closeTime }, { new: true })

        res.json({ message: "Pitch close time updated succesfully", pitchDetails: pitch })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default updateCloseTime;


