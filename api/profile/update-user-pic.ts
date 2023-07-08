
import asyncHandler from "../middlewares/async-handler";

const updateUserPic = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        var userPic = (req.file as Express.MulterS3.File).location;
        console.log(userPic)
        req.user.userPic = userPic;
        req.user.markModified("userPic");
        req.user.save()
        res.json({ message: "User image updated successfully", userPic: userPic, })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default updateUserPic;


