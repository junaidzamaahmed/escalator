import { Request, Response } from "express";
import * as courseModel from "../models/course.model";
import { Role } from "@prisma/client";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseModel.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses", data: null });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const course = await courseModel.findById(id);

    if (!course.data) {
      res.status(404).json({ error: "Course not found", data: null });
      return;
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course", data: null });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseModel.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course", data: null });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const course = await courseModel.update(id, req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course", data: null });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await courseModel.deleteCourse(id);
    res.status(200).json({ error: null, data: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course", data: null });
  }
};
