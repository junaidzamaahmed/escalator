import { Router } from "express";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourcesByCourseId,
  updateResource,
} from "src/controllers/resources.controller";
import { auth } from "src/middlewares/auth";

const resourceRouter = Router();

resourceRouter.get("/", getAllResources);
resourceRouter.get("/:courseId", getResourcesByCourseId);
resourceRouter.post("/", auth(true), createResource);
resourceRouter.put("/:id", auth(true), updateResource);
resourceRouter.delete("/:id", auth(true), deleteResource);

export default resourceRouter;
