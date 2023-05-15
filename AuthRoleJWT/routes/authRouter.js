import {Router} from "express";
// Middleware
import { validationLogin, validationRegister } from "../middlewares/validationSchema.js";
import { checkCandidate, checkRoles } from "../middlewares/verifySignUp.js";
// Controller
import authController from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register', [validationRegister, checkCandidate, checkRoles], authController.register);
authRouter.post('/login', [validationLogin],authController.login)
authRouter.post("/refreshToken", authMiddleware, authController.refresh);
authRouter.delete("/logout", authMiddleware, authController.logout);


export default authRouter;