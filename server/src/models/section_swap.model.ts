import { db } from "../utils/db";
import { Course, Section_swap, User } from "@prisma/client";

export const section_swap_getAll = async () => {
  try {
    const section_swap: (Section_swap & {
      user: Partial<User>;
      desiredCourse: Course;
      currentCourse: Course;
    })[] = await db.section_swap.findMany({
      include: {
        desiredCourse: true,
        currentCourse: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return { error: null, data: section_swap };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const section_swapbyID = async (id: string) => {
  try {
    const section_swap:
      | (Section_swap & {
          user: Partial<User>;
          desiredCourse: Course;
          currentCourse: Course;
        })
      | null = await db.section_swap.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        desiredCourse: true,
        currentCourse: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return { error: null, data: section_swap };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const section_swapDelete = async (id: string) => {
  try {
    const section_swap = await db.section_swap.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { error: null };
  } catch (error) {
    return { error: "An error occurred" };
  }
};

export const section_swapUpdate = async (id: string, req: any) => {
  try {
    const section_swap:
      | (Section_swap & {
          user: Partial<User>;
          desiredCourse: Course;
          currentCourse: Course;
        })
      | null = await db.section_swap.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...req.body,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        desiredCourse: true,
        currentCourse: true,
      },
    });

    return { error: null, data: section_swap };
  } catch (error) {
    return { error: "An error occurred", data: null };
  }
};

export const section_swapCreate = async (req: any) => {
  try {
    const section_swap:
      | (Section_swap & {
          user: Partial<User>;
          desiredCourse: Course;
          currentCourse: Course;
        })
      | null = await db.section_swap.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        desiredCourse: true,
        currentCourse: true,
      },
    });

    return { error: null, data: section_swap };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred", data: null };
  }
};
