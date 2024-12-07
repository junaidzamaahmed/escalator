import { Request, Response } from "express";
import * as departmentModel from "../models/department.model";

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await departmentModel.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments", data: null });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const department = await departmentModel.findById(id);

    if (!department) {
      res.status(404).json({ error: "Department not found", data: null });
      return;
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department", data: null });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await departmentModel.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to create department", data: null });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const department = await departmentModel.update(id, req.body);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department", data: null });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await departmentModel.deleteDepartment(id);

    res
      .status(200)
      .json({ error: null, data: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete department", data: null });
  }
};
