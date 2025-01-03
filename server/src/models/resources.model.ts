import { connect } from "http2";
import { db } from "src/utils/db";

export const findAll = async () => {
  try {
    const requests = await db.resources.findMany({
      orderBy: [{ updatedAt: "desc" }],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return { error: null, data: requests };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const findById = async (id: number) => {
  try {
    const request = await db.resources.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const create = async (data: any, userId: number) => {
  try {
    const request = await db.resources.create({
      data: {
        ...data,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const update = async (id: number, data: any) => {
  try {
    const request = await db.resources.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return { error: null, data: request };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const deleteResource = async (id: number) => {
  try {
    console.log(id);
    await db.resources.delete({
      where: { id },
    });
    return { error: null, data: null };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const findByCourseId = async (courseId: number) => {
  try {
    const requests = await db.resources.findMany({
      where: {
        courseId,
      },
      orderBy: [{ updatedAt: "desc" }],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        courses: {
          select: {
            id: true,
            title: true,
            code: true,
          },
        },
      },
    });
    return { error: null, data: requests };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};
