import { db } from "../utils/db";
import { NextFunction, Request, RequestHandler, Response } from "express";
import bycript from "bcrypt";
import { Resend } from "resend";
import { generateVerificationEmailHTML } from "../utils/generateEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const generateToken = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createUserModel = async (
  name: string,
  email: string,
  password: string,
  image: string
) => {
  try {
    const hashedPassword = await bycript.hash(
      password,
      Number(process.env.BYCRYPT_SALT_ROUNDS)
    );
    const isExisting = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (isExisting) {
      return { error: "User already exists", data: null };
    } else {
      const verificationCode = generateToken().toString();

      const user = await db.user.create({
        data: {
          name,
          email,
          image: image || "",
          password: hashedPassword,
          verificationCode,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      });

      // Send email to user for email verification
      const { data, error } = await resend.emails.send({
        from: "Escalator <escalator@softyse.com>",
        to: [email],
        subject: "Email Verification Code",
        html: generateVerificationEmailHTML({
          name: user.name,
          code: verificationCode,
          link: `${process.env.CLIENT_URL}/`,
        }),
      });

      return { error: null, data: user };
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const getUsersModel = async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        isVerified: true,
      },
    });
    return { error: null, data: users };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const getUserByIdModel = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    if (!user) {
      return { error: "User not found", data: null };
    } else {
      return { error: null, data: user };
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const updateUserModel = async (id: string, values: any) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return { error: "User not found", data: null };
    } else {
      const updatedUser = await db.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...values,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      });
      return { error: null, data: updatedUser };
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const deleteUserModel = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return { error: "User not found", data: null };
    } else {
      await db.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      return { error: null, data: "User deleted" };
    }
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};
