import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllGroups = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({
      where: {
        id_event: id_event,
      },
    });
  } catch (error) {
    return false;
  }
};

type GetOneFilter = { id: number; id_event?: number };
export const getGroup = async (filters: GetOneFilter) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filters });
  } catch (error) {
    return false;
  }
};

export const add = async (id_event: number, name: string) => {
  try {
    return await prisma.eventGroup.create({
      data: {
        id_event: id_event,
        name,
      },
    });
  } catch (error) {
    return false;
  }
};

export const updateGroup = async (
  id: number,
  id_event: number,
  name: string
) => {
  try {
    return await prisma.eventGroup.update({
      where: {
        id: id,
      },
      data: {
        id_event: id_event,
        name,
      },
    });
  } catch (error) {
    return false;
  }
  
};

export const deleteGroup = async (id: number) => {
  try {
    return await prisma.eventGroup.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return false;
  }
};
