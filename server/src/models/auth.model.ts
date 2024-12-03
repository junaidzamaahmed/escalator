import bycript from "bcrypt";
import { db } from "@/utils/db";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "@/utils/generateJWT";
import jwt from "jsonwebtoken";
import { addMinutes } from "date-fns";
import { Resend } from "resend";
import {
  generatePasswordResetEmailHTML,
  generateVerificationEmailHTML,
} from "@/utils/generateEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authLogin = async (
  email: string,
  password: string,
  res: Response
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        isVerified: true,
      },
    });

    if (!user) {
      return { error: "Invalid credentials", data: null };
    } else {
      const passwordMatch = await bycript.compare(password, user.password);
      if (passwordMatch) {
        const { password, ...userWithoutPassword } = user;
        const accessToken = generateAccessToken(userWithoutPassword);
        const refreshToken = generateRefreshToken(userWithoutPassword);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        return {
          error: null,
          data: {
            accessToken,
            isVerified: user.isVerified,
          },
        };
      } else {
        return { error: "Invalid credentials", data: null };
      }
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const authVerifyUser = async (
  email: string,
  verificationCode: string
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        isVerified: true,
        verificationCode: true,
      },
    });

    if (!user) {
      return { error: "User not found", data: null };
    } else {
      if (user.isVerified) {
        return {
          error: null,
          data: {
            message: "User is already verified",
          },
        };
      } else {
        if (user.verificationCode !== verificationCode) {
          return {
            error: "Invalid verification code",
            data: null,
          };
        } else {
          await db.user.update({
            where: {
              email,
            },
            data: {
              isVerified: true,
            },
          });
          return {
            error: null,
            data: {
              message: "User verified successfully",
            },
          };
        }
      }
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const authResendVerificationCode = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        isVerified: true,
      },
    });

    if (!user) {
      return { error: "User not found", data: null };
    } else {
      if (user.isVerified) {
        return {
          error: null,
          data: {
            message: "User is already verified",
          },
        };
      } else {
        const verificationCode = generateToken().toString();
        const updatedUser = await db.user.update({
          where: {
            email,
          },
          data: {
            verificationCode,
          },
        });
        const { data, error } = await resend.emails.send({
          from: "Escalator <escalator@softyse.com>",
          to: [email],
          subject: "Email Verification Code",
          html: generateVerificationEmailHTML({
            name: updatedUser.name,
            code: verificationCode,
            link: `${process.env.CLIENT_URL}/`,
          }),
        });
        return {
          error: null,
          data: {
            message: "Verification code resent successfully",
          },
        };
      }
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const authRefreshToken = async (refreshTokenVar: string) => {
  if (!refreshTokenVar) {
    return { error: "Unauthorized", data: null };
  }
  try {
    let verifiedToken: any = null;
    try {
      verifiedToken = jwt.verify(
        refreshTokenVar,
        process.env.REFRESH_SECRET_KEY!
      );
    } catch (error) {
      return { error: "Unauthorized", data: null };
    }
    const { email } = verifiedToken;
    if (!email) {
      return { error: "Unauthorized", data: null };
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
      },
    });
    if (!user) {
      return { error: "Unauthorized", data: null };
    }
    const accessToken = generateAccessToken(user);
    return {
      error: null,
      data: {
        accessToken,
        isVerified: user.isVerified,
      },
    };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

const generateToken = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const authForgotPassword = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      return {
        error: null,
        data: {
          message:
            "A password reset email has been sent. It will expire within 24 hours.",
        },
      };
    } else {
      const resetToken = generateToken().toString();
      const resetTokenExpiry = addMinutes(new Date(), 1440);

      const updatedUser = await db.user.update({
        where: {
          email,
        },
        data: {
          resetToken,
          resetTokenExpiry,
        },
        select: {
          name: true,
          email: true,
        },
      });
      await resend.emails.send({
        from: "Escalator <escalator@softyse.com>",
        to: [email],
        subject: "Password Reset Request",
        html: generatePasswordResetEmailHTML({
          name: updatedUser.name || "",
          code: resetToken,
          link: `${process.env.CLIENT_URL}/${email}/reset-password/${resetToken}`,
        }),
      });

      return {
        error: null,
        data: {
          message:
            "A password reset email has been sent. It will expire within 24 hours.",
        },
      };
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const authResetPassword = async (
  resetToken: string,
  email: string,
  password: string,
  req: Request
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        resetToken: true,
        resetTokenExpiry: true,
      },
    });
    if (!user) {
      return {
        error: "Invalid token or token has expired",
        data: null,
      };
    } else {
      const isTokenValid = user.resetToken === resetToken;
      const isTokenExpired = new Date(user.resetTokenExpiry!) < new Date();
      if (isTokenValid && !isTokenExpired) {
        const hashedPassword = await bycript.hash(
          password,
          Number(process.env.BYCRYPT_SALT_ROUNDS)!
        );
        await db.user.update({
          where: {
            email,
          },
          data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
          select: {
            email: true,
          },
        });
        req.body = { email, password };
        return {
          error: null,
          data: {
            message: "Password reset successful",
          },
        };
      } else {
        return {
          error: "Invalid token or token has expired",
          data: null,
        };
      }
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};
