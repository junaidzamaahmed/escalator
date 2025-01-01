import {
  section_swap_getAll,
  section_swapbyID,
  section_swapCreate,
  section_swapDelete,
  section_swapUpdate,
} from "../models/section_swap.model";
import { Course, Section_swap, User } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";

export const getsection_swap: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data: {
      error: string | null;
      data:
        | (Section_swap & {
            user: Partial<User>;
            desiredCourse: Course;
            currentCourse: Course;
          })[]
        | null;
    } = await section_swap_getAll();
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const getsection_swapbyID: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const data: {
      error: string | null;
      data:
        | (Section_swap & {
            user: Partial<User>;
            desiredCourse: Course;
            currentCourse: Course;
          })
        | null;
    } = await section_swapbyID(id);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const deletesection_swap: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const data: {
      error: string | null;
    } = await section_swapDelete(id);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const updatesection_swap: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const data: {
      error: string | null;
      data:
        | (Section_swap & {
            user: Partial<User>;
            desiredCourse: Course;
            currentCourse: Course;
          })
        | null;
    } = await section_swapUpdate(id, req);

    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};

export const createsection_swap: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data: {
      error: string | null;
      data:
        | (Section_swap & {
            user: Partial<User>;
            desiredCourse: Course;
            currentCourse: Course;
          })
        | null;
    } = await section_swapCreate(req);
    res.status(data.error ? 404 : 200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", data: null });
  }
};
