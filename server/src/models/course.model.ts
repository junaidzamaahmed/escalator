import { Course } from "@prisma/client";
import { db } from "src/utils/db";

export const findAll = async () => {
  try {
    const courses = await db.course.findMany({
      include: {
        Department: true,
      },
    });
    return { error: null, data: courses };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const findById = async (id: number) => {
  try {
    const course = await db.course.findUnique({
      where: { id },
      include: {
        Department: true,
      },
    });
    return { error: null, data: course };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const create = async (data: Omit<Course, "id">) => {
  try {
    const course = await db.course.create({
      data,
      include: {
        Department: true,
      },
    });
    return { error: null, data: course };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const update = async (id: number, data: Partial<Course>) => {
  try {
    const course = await db.course.update({
      where: { id },
      data,
      include: {
        Department: true,
      },
    });
    return { error: null, data: course };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const deleteCourse = async (id: number) => {
  try {
    const course = await db.course.delete({
      where: { id },
    });
    return { error: null, data: course };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};
