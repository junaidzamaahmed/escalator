import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  authForgotPassword,
  authLogin,
  authRefreshToken,
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
    console.log(data);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, verificationCode } = req.body;

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
  const { resetToken } = req.query;
  const { email, password } = req.body;
  try {
    const data: { error: string | null; data: { message: string } | null } =
      await authResetPassword(resetToken as string, email, password);
    if (data.error) {
      res.status(401).json(data);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};