import { Request, Response } from "express";
import * as resourceModel from "../models/resources.model";

export const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await resourceModel.findAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources", data: null });
  }
};

export const getResourcesByCourseId = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const resources = await resourceModel.findByCourseId(courseId);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources", data: null });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const resource = await resourceModel.create(req.body, userId);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource", data: null });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const resource = await resourceModel.update(id, req.body);
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to update resource", data: null });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await resourceModel.deleteResource(id);
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resource", data: null });
  }
};
