
import asyncHandler from '../middlewares/async-handler';

const verifyToken = asyncHandler(async (req, res) => {
    if (req.user?.role == "User") {
        res.json(true)
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
})

export default verifyToken;