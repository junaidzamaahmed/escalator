import { Router } from "express";
import { auth } from "src/middlewares/auth";
import { Role } from "@prisma/client";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "src/controllers/department.controller";

const departmentRouter = Router();

departmentRouter.get("/", getAllDepartments);
departmentRouter.get("/:id", getDepartmentById);
departmentRouter.post("/", auth(true), createDepartment);
departmentRouter.put("/:id", auth(true, Role.ADMIN), updateDepartment);
departmentRouter.delete("/:id", auth(true, Role.ADMIN), deleteDepartment);

export default departmentRouter;
