import { ThesisGroupRequest } from "@prisma/client";
import { db } from "src/utils/db";

export const findAll = async () => {
  try {
    const requests = await db.thesisGroupRequest.findMany({
      include: {
        user: true,
      },
    });
    return { error: null, data: requests };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const findById = async (id: number) => {
  try {
    const request = await db.thesisGroupRequest.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const create = async (data: Omit<ThesisGroupRequest, "id">) => {
  try {
    const request = await db.thesisGroupRequest.create({
      data,
      include: {
        user: true,
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const update = async (id: number, data: Partial<ThesisGroupRequest>) => {
  try {
    const request = await db.thesisGroupRequest.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const deleteThesisGroup = async (id: number) => {
  try {
    const request = await db.thesisGroupRequest.delete({
      where: { id },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};
