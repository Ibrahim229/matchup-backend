import { Router } from "express";
import upload from "../../config/multer";
import updateUserPic from "./update-user-pic";



const profileRouter = Router();
profileRouter.put("/updateProfilePic", upload.single("image"), updateUserPic)
profileRouter.put("/changeFullName", updateUserPic)



export default profileRouter;