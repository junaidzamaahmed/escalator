import { db } from "../utils/db";
import { NextFunction, Request, RequestHandler, Response } from "express";
import bycript from "bcrypt";
import { Role } from "@prisma/client";
import { Resend } from "resend";
import { generateVerificationEmailHTML } from "../utils/generateEmail";
import {
  createUserModel,
  deleteUserModel,
  getUserByIdModel,
  getUsersModel,
  updateUserModel,
} from "src/models/user.model";

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsersModel();
    res.status(200).json({ error: null, data: users });
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const getUserById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const notAuthorized =
    req.user?.role !== Role.ADMIN && Number(req.user?.id) !== Number(id);
  if (notAuthorized || !id || parseInt(id) < 0 || isNaN(parseInt(id))) {
    res.status(400).json({ error: "Invalid ID", data: null });
    return;
  }

  try {
    const user = await getUserByIdModel(id);
    res.status(user.error ? 404 : 200).json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, image } = req.body;
  try {
    const user = await createUserModel(name, email, password, image || "");
    res.status(user.error ? 400 : 201).json(user);
    if (!user.error) next();
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const values = req.body;
  try {
    const user = await updateUserModel(id, values);
    res.status(user.error ? 404 : 200).json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const user = await deleteUserModel(id);
    res.status(user.error ? 404 : 200).json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};
