import { Request, Response } from "express";
import * as thesisGroupModel from "../models/thesis-group.model";

export const getAllThesisGroups = async (req: Request, res: Response) => {
  try {
    const requests = await thesisGroupModel.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch thesis group requests", data: null });
  }
};

export const getThesisGroupById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const request = await thesisGroupModel.findById(id);

    if (!request.data) {
      res
        .status(404)
        .json({ error: "Thesis group request not found", data: null });
      return;
    }

    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch thesis group request", data: null });
  }
};

export const createThesisGroup = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const request = await thesisGroupModel.create({ ...req.body, userId });
    res.status(201).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create thesis group request", data: null });
  }
};

export const updateThesisGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const request = await thesisGroupModel.update(id, req.body);
    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update thesis group request", data: null });
  }
};

export const deleteThesisGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await thesisGroupModel.deleteThesisGroup(id);
    res
      .status(200)
      .json({ error: null, data: "Thesis group request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete thesis group request", data: null });
  }
};
