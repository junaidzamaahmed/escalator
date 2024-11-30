import { deletesection_swap, getsection_swap, getsection_swapbyID, updatesection_swap } from "@/controllers/section_swap.controller";
import { auth } from "@/middlewares/auth";
import { Role } from "@prisma/client";
import { Router } from "express";

const section_swapRouter= Router();
section_swapRouter.get("/", getsection_swap);
section_swapRouter.get("/:id", getsection_swapbyID);
section_swapRouter.put("/:id", auth(Role.ADMIN, Role.USER), updatesection_swap);
section_swapRouter.delete("/:id", auth(Role.ADMIN, Role.USER), deletesection_swap);

export default section_swapRouter