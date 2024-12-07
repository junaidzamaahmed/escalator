import { Department } from "@prisma/client";
import { db } from "src/utils/db";

export const findAll = async () => {
  try {
    const departments = await db.department.findMany();
    return { error: null, data: departments };
  } catch (error) {
    return { error: "An error occured", data: null };
  }
};

export const findById = async (id: number) => {
  try {
    const department = await db.department.findUnique({
      where: { id },
    });
    if (!department) {
      return {
        error: "Department not found",
        data: null,
      };
    }
    return { error: null, data: department };
  } catch (error) {
    return { error: "An error occured", data: null };
  }
};

export const create = async (data: Omit<Department, "id">) => {
  try {
    const department = await db.department.create({ data });
    return { error: null, data: department };
  } catch (error) {
    return { error: "An error occured", data: null };
  }
};

export const update = async (id: number, data: any) => {
  try {
    const department = await db.department.update({
      where: { id },
      data,
    });
    return { error: null, data: department };
  } catch (error) {
    return { error: "An error occured", data: null };
  }
};

export const deleteDepartment = async (id: number) => {
  try {
    const department = await db.department.delete({
      where: { id },
    });
    return { error: null, data: department };
  } catch (error) {
    return { error: "An error occured", data: null };
  }
};
