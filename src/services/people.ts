
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPeoples = async (id_group: number, id_event: number) => {
  try {
    return await prisma.eventPeople.findMany({
      where: {
        id_group: id_group,
        id_event: id_event,
      },
    });
  } catch (error) {
    return false;
  }
};

export const getPeople = async (
  id: number,
  id_group: number,
  id_event?: number
) => {
  try {
    return await prisma.eventPeople.findFirst({
      where: {
        id: id,
        id_group: id_group,
        id_event: id_event,
      },
    });
  } catch (error) {
    return false;
  }
};

type PeopleData = {
  id_group: number;
  id_event: number;
  name: string;
  cpf: string;
  matched?: string;
};

type UpdatePeopleData = Partial<PeopleData>;
export const addPeople = async (data: PeopleData) => {
  try {
    return await prisma.eventPeople.create({
      data: {
        id_group: data.id_group,
        id_event: data.id_event,
        name: data.name,
        cpf: data.cpf,
        matched: data.matched,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatePeople = async (id: number, data: UpdatePeopleData) => {
  try {
    return await prisma.eventPeople.update({
      where: {
        id: id,
      },
      data: {
        id_group: data.id_group,
        id_event: data.id_event,
        name: data.name,
        cpf: data.cpf,
      },
    });
  } catch (error) {
    return false;
  }
};

export const deletePeople = async (id: number) => {
  try {
    return await prisma.eventPeople.delete({ where: { id } });

  } catch (error) {
    return false;
  }
};
