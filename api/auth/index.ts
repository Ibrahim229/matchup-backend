import { Router } from "express";
import signup from "./signup";
import signUpValidate from "../../validations/auth/sign_up_validation";
import login from "./login";

const authRouter = Router();

authRouter.post('/signup', signUpValidate, signup);
authRouter.post('/login', login);

export default authRouter;