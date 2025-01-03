import {
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  verifyUser,
  logout,
  resendVerificationCode,
} from "../controllers/auth.controller";
import { createUser } from "../controllers/user.controller";
import { auth } from "../middlewares/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", createUser, login);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/reset-password", resetPassword, login);
authRouter.put("/forgot-password", forgotPassword);
authRouter.put("/verify-user", auth(false), verifyUser);
authRouter.get(
  "/resend-verification-code",
  auth(false),
  resendVerificationCode
);
authRouter.get("/logout", logout);

export default authRouter;
