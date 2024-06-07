import * as express from "express";
import { authentication, authorization } from "../../middleware/auth.middleware";
import { UserController } from "../../controllers/main/UserController";
import { BillingController } from "../../controllers/main/BillingController";
import { MovieController } from "../../controllers/main/MovieController";
import { CreditCardController } from "../../controllers/main/CreditCardController";

const mainRouter = express.Router();

// User endpoints
mainRouter.get("/profile", authentication, authorization(["user", "admin"]), UserController.getProfile);
mainRouter.get("/users", authentication, authorization(["admin"]), UserController.getUsers);
mainRouter.put("/users/:ids", authentication, authorization(["user", "admin"]), UserController.updateUser);
mainRouter.delete("/users/:ids", authentication, authorization(["admin"]), UserController.deleteUser);
mainRouter.get("/users/billing/:id", authentication, authorization(["user", "admin"]), UserController.getUserBilling);

// Billing endpoints
mainRouter.get("/billings/", authentication, authorization(["user", "admin"]), BillingController.getAllBillings);
mainRouter.get("/billing/:id", authentication, authorization(["user", "admin"]), BillingController.getBilling);
mainRouter.post("/billing/create/:id", authentication, authorization(["user", "admin"]), BillingController.setBilling);
mainRouter.put("/billing/update/:id", authentication, authorization(["user", "admin"]), BillingController.updateBilling);
mainRouter.delete("/billing/delete/:id", authentication, authorization(["user", "admin"]), BillingController.deleteBilling);

// Movie endpoints
mainRouter.get("/movies", authentication, authorization(["admin"]), MovieController.getAllMovies);
mainRouter.post("/movies/create", authentication, authorization(["admin"]), MovieController.createMovie);
mainRouter.put("/movies/update/:ids", authentication, authorization(["admin"]), MovieController.updateMovie);
mainRouter.delete("/movies/delete:ids", authentication, authorization(["admin"]), MovieController.deleteMovie);
mainRouter.get("/movies/by_user:ids", authentication, authorization(["admin"]), MovieController.getMoviesByUser);
mainRouter.get("/movies/reviews:ids", authentication, authorization(["admin"]), (req, res) => res.send("coming soon"));
mainRouter.post("/movies/reviewed:ids", authentication, authorization(["admin"]), (req, res) => res.send("coming soon"));

// Credit Card endpoints
mainRouter.get("/creditcard", authentication, authorization(["user", "admin"]), CreditCardController.getAllCreditCards);
mainRouter.post("/creditcard/create", authentication, authorization(["user", "admin"]), CreditCardController.createCreditCard);
mainRouter.put("/creditcard/update/:ids", authentication, authorization(["user", "admin"]), CreditCardController.updateCreditCard);
mainRouter.delete("/creditcard/delete/:ids", authentication, authorization(["user", "admin"]), CreditCardController.deleteCreditCard);

// Default endpoint
mainRouter.get("/", UserController.home);

export default mainRouter;
