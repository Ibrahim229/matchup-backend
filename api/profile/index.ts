import { Router } from "express";
import upload from "../../config/multer";
import updateUserPic from "./update-user-pic";
import changeFullName from "./change-full-name";
import changePassword from "./change-password";
import deleteAccount from "./delete-account";



const profileRouter = Router();
profileRouter.put("/updateProfilePic", upload.single("image"), updateUserPic)
profileRouter.get("/changeFullName/:fullName", changeFullName)
profileRouter.put("/changePass", changePassword)
profileRouter.delete("/deleteAccount", deleteAccount)



export default profileRouter;