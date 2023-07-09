import { Router } from "express";
import upload from "../../config/multer";
import updateUserPic from "./update-user-pic";
import changeFullName from "./change-full-name";
import changePassword from "./change-password";



const profileRouter = Router();
profileRouter.put("/updateProfilePic", upload.single("image"), updateUserPic)
profileRouter.get("/changeFullName/:fullName", changeFullName)
profileRouter.put("/changePass", changePassword)



export default profileRouter;