
import asyncHandler from '../middlewares/async-handler';

const verifyToken = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        var userID = req.user._id;
        var userData = req.user?.toJson();
        res.json({ valid: true, userData: userData, userID: userID })
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default verifyToken;