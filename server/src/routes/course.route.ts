import { Router } from "express";
import { auth } from "src/middlewares/auth";
import { Role } from "@prisma/client";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "src/controllers/course.controller";

const courseRouter = Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.post("/", auth(true), createCourse);
courseRouter.put("/:id", auth(true, Role.ADMIN), updateCourse);
courseRouter.delete("/:id", auth(true, Role.ADMIN), deleteCourse);

export default courseRouter;
