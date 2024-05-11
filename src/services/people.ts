import { PrismaClient, Prisma } from "@prisma/client";
import * as groups from "./groups";

const prisma = new PrismaClient();

type GetAllFilter = {
	id_event: number;
	id_group?: number;
};
export const getAll = async (filters: GetAllFilter) => {
	try {
		return await prisma.eventPeople.findMany({ where: filters });
	} catch (error) {
		console.error("error: ", error);
	}
};

type GetFilter = {
	id?: number;
	id_group?: number;
	id_event?: number;
	cpf?: string;
};

export const getPeople = async (filter: GetFilter) => {
	try {
		if (!filter.id && !filter.cpf) {
			return false;
		}
		return await prisma.eventPeople.findFirst({ where: filter });
	} catch (error) {
		return false;
	}
};

type PeopleData = Prisma.Args<typeof prisma.eventPeople, "create">["data"];
export const addPeople = async (data: PeopleData) => {
	try {
		if (!data.id_group) return false;

		const group = await groups.getGroup({
			id: data.id_group,
			id_event: data.id_event,
		});

		if (!group) return false;

		return await prisma.eventPeople.create({ data });
	} catch (error) {
		console.log(error);
		return false;
	}
};

type UpdateDataPeople = Prisma.Args<typeof prisma.eventPeople, "update">["data"];
type UpdateFilter = { id?: number; id_event?: number; id_group?: number };
export const updatePeople = async (filter: UpdateFilter, data: UpdateDataPeople) => {
	try {
		return await prisma.eventPeople.updateMany({ where: filter, data });
	} catch (error) {
		return false;
	}
};

type DeleteFilter = { id: number; id_event?: number; id_group?: number };

export const deletePeople = async (filter: DeleteFilter) => {
	try {
		return await prisma.eventPeople.delete({ where: filter });
	} catch (error) {
		return false;
	}
};
