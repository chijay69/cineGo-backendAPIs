import * as express from "express";
import { authentication, authorization } from "../../middleware/auth.middleware";
import { AuthController } from "../../controllers/auth/AuthController";

const userRouter = express.Router();

userRouter.post("/signup", AuthController.siginUp);
userRouter.post("/signin", AuthController.signIn);

export default userRouter;
