import { Router } from "express";
import { auth } from "src/middlewares/auth";
import {
  createThesisGroup,
  deleteThesisGroup,
  getAllThesisGroups,
  getThesisGroupById,
  updateThesisGroup,
} from "src/controllers/thesis-group.controller";
const thesisGroupRouter = Router();

thesisGroupRouter.get("/", getAllThesisGroups);
thesisGroupRouter.get("/:id", getThesisGroupById);
thesisGroupRouter.post("/", auth(true), createThesisGroup);
thesisGroupRouter.put("/:id", auth(true), updateThesisGroup);
thesisGroupRouter.delete("/:id", auth(true), deleteThesisGroup);

export default thesisGroupRouter;
