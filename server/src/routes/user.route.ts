import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth";
import { Role } from "@prisma/client";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", auth(true, Role.ADMIN), getUsers);
userRouter.get("/:id", auth(false, Role.ADMIN, Role.USER), getUserById);
userRouter.put("/:id", auth(true, Role.ADMIN, Role.USER), updateUser);
userRouter.delete("/:id", auth(true, Role.ADMIN, Role.USER), deleteUser);

export default userRouter;
