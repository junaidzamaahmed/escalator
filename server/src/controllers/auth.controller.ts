import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  authForgotPassword,
  authLogin,
  authRefreshToken,
  authResendVerificationCode,
  authResetPassword,
  authVerifyUser,
} from "@/models/auth.model";

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data: {
      error: string | null;
      data: { accessToken: string | null; isVerified: boolean | null } | null;
    } = await authLogin(email, password, res);
    console.log("returned from login model");
    console.log(data);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    res
      .status(200)
      .json({ error: null, data: { message: "Logged out successfully" } });
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { verificationCode } = req.body;
  const { email } = req.user;
  try {
    const data: {
      error: string | null;
      data: { message: string } | null;
    } = await authVerifyUser(email, verificationCode);

    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const resendVerificationCode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.user;
  try {
    const data: {
      error: string | null;
      data: { message: string } | null;
    } = await authResendVerificationCode(email);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const refreshToken: any = async (req: Request, res: Response) => {
  const refreshTokenVar = req.cookies.refreshToken;
  if (!refreshTokenVar) {
    return res.status(401).json({ error: "Unauthorized", data: null });
  }

  try {
    const data: {
      error: string | null;
      data: { accessToken: string; isVerified: boolean } | null;
    } = await authRefreshToken(refreshTokenVar);

    res.status(data.error ? 401 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  try {
    const data: { error: string | null; data: { message: string } | null } =
      await authForgotPassword(email);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, newPassword, verificationCode } = req.body;
  try {
    const data: { error: string | null; data: { message: string } | null } =
      await authResetPassword(verificationCode, email, newPassword, req);
    if (data.error) {
      res.status(401).json(data);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};
