import { db } from "@/utils/db";
import { Course, Section_swap, User } from "@prisma/client";

export const section_swap_getAll = async (
    
  ) => {
    try {
      const section_swap : (Section_swap & {user:User, desiredCourse:Course,currentCourse:Course})[] = await db.section_swap.findMany({
        include: {
            desiredCourse:true,
            currentCourse:true,
            user:true
        },
      });
  
        return {error:null,data:section_swap};
    } catch (error) {
      return { error: "An error occurred", data: null };
    }
  };

  export const section_swapbyID = async (
    id:string
  ) => {
    try {
      const section_swap : (Section_swap & {user:User, desiredCourse:Course,currentCourse:Course})|null = await db.section_swap.findUnique({
        where:{
          id:parseInt(id)
        },
        include: {
            desiredCourse:true,
            currentCourse:true,
            user:true
        },
      });
  
        return {error:null,data:section_swap};
    } catch (error) {
      return { error: "An error occurred", data: null };
    }
  };  
  
  export const section_swapDelete = async (
    id:string
  ) => {
    try {
      const section_swap = await db.section_swap.delete({
        where:{
          id:parseInt(id)
        }
      })
  
        return {error:null};
    } catch (error) {
      return { error: "An error occurred" };
    }
  };  

  export const section_swapUpdate = async (
    id:string,
    values: any
  ) => {
    try {
      const section_swap : (Section_swap & {user:User, desiredCourse:Course,currentCourse:Course})|null = await db.section_swap.update({
        where:{
          id:parseInt(id)
        },
        data:{
          ...values
        },
        include:{
          user:true,
          desiredCourse:true,
          currentCourse:true
        }
      });
  
        return {error:null,data:section_swap};
    } catch (error) {
      return { error: "An error occurred", data: null };
    }
  };  
    