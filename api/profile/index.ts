import { Router } from "express";
import upload from "../../config/multer";
import updateUserPic from "./update-user-pic";
import changeFullName from "./change-full-name";



const profileRouter = Router();
profileRouter.put("/updateProfilePic", upload.single("image"), updateUserPic)
profileRouter.get("/changeFullName/:fullName", changeFullName)



export default profileRouter;