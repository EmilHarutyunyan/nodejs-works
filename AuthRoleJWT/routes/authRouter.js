import {Router} from "express";
// Middleware
import { validationLogin, validationRegister } from "../middlewares/validationSchema.js";
import { checkCandidate, checkRoles } from "../middlewares/verifySignUp.js";
// Controller
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', [validationRegister, checkCandidate, checkRoles], authController.register);
authRouter.post('/login', [validationLogin],authController.login)
authRouter.post('/refreshToken',authController.refresh)
authRouter.delete('/logout',authController.logout)


export default authRouter;