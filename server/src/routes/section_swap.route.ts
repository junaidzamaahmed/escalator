import {
  createsection_swap,
  deletesection_swap,
  getsection_swap,
  getsection_swapbyID,
  updatesection_swap,
} from "../controllers/section_swap.controller";
import { auth } from "../middlewares/auth";
import { Router } from "express";

const section_swapRouter = Router();
section_swapRouter.get("/", getsection_swap);
section_swapRouter.get("/:id", getsection_swapbyID);
section_swapRouter.put("/:id", auth(true), updatesection_swap);
section_swapRouter.delete("/:id", auth(true), deletesection_swap);
section_swapRouter.post("/", auth(true), createsection_swap);

export default section_swapRouter;
