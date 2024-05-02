import * as express from "express";
import { authentication, authorization } from "../../middleware/auth.middleware";
import { UserController } from "../../controllers/main/UserController";

const mainRouter = express.Router();

mainRouter.get("/profile", authentication, authorization(["user", "admin"]), UserController.getProfile);

mainRouter.get("/users", authentication, authorization(["admin"]), UserController.getUsers);

mainRouter.put("/users/:ids", authentication, authorization(["user", "admin"]), UserController.updateUser);

mainRouter.delete("/users/:ids", authentication, authorization(["admin"]), UserController.deleteUser);

mainRouter.get("/", UserController.home)

export default mainRouter;
