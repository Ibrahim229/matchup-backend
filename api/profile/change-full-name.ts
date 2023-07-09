
import asyncHandler from "../middlewares/async-handler";

const changeFullName = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        const { fullName } = req.params;
        req.user.fullName = fullName;
        req.user.markModified("fullName");
        req.user.save()
        res.json({ message: "FullName updated successfully", fullName: fullName, })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default changeFullName;


