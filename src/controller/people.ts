import { z } from "zod";
import { RequestHandler } from "express";

import * as people from "./../services/people";

export const getAll: RequestHandler = async (req, res) => {
	const { id_group, id_event } = req.params;

	const items = await people.getAll({
		id_group: parseInt(id_group),
		id_event: parseInt(id_event),
	});

	if (people) return res.json({ people: items });

	res.json({ error: "ocorreu um erro" });
};

export const getPeople: RequestHandler = async (req, res) => {
	const { id_group, id_event, id } = req.params;

	const personItem = await people.getPeople({
		id: parseInt(id),
		id_group: parseInt(id_group),
		id_event: parseInt(id_event),
	});

	if (personItem) return res.json({ peoples: personItem });

	res.json({ error: "ocorreu um erro" });
};

export const addPeople: RequestHandler = async (req, res) => {
	const { id_group, id_event } = req.params;
	const { name, cpf } = req.body;

	// const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

	const peopleSchema = z.object({
		name: z.string(),
		cpf: z.string().transform((str) => str.replace(/\.|-/gm, "")),
		matched: z.string().optional(), 
	});

	const body = peopleSchema.safeParse(req.body);

	if (!body.success) return res.json({ error: "Dados inválidos" });

	const newPeople = await people.addPeople({
		id_group: parseInt(id_group),
		id_event: parseInt(id_event),
		name: body.data.name,
		cpf: body.data.cpf,
		matched: body.data.matched,
	});

	if (newPeople) return res.status(201).json({ people: newPeople });

	res.json({ error: "ocorreu um erro " + newPeople });
};

export const updatePeople: RequestHandler = async (req, res) => {
	const { id_event, id_group, id } = req.params;
	const { name, cpf } = req.body;

	const peopleSchema = z.object({
		name: z.string().optional(),
		cpf: z
			.string()
			.transform((str) => str.replace(/\.|-/gm, ""))
			.optional(),
		matched: z.string().optional(),
	});

	const body = peopleSchema.safeParse(req.body);

	if (!body.success) {
		console.log(body.error);
		return res.json({ error: "Dados inválidos. erro ao atualizar usuario" });
	}

	const updatedPeople = await people.updatePeople(
		{
			id: parseInt(id),
			id_group: parseInt(id_group),
			id_event: parseInt(id_event),
		},
		body.data
	);
	if (updatedPeople) {
		const personItem = await people.getPeople({
			id: parseInt(id),
			id_event: parseInt(id_event),
		});
		return res.json({ people: personItem });
	}
};

export const deletePeople: RequestHandler = async (req, res) => {
	const { id, id_group, id_event } = req.params;

	const deletedPeople = await people.deletePeople({
		id: parseInt(id),
		id_group: parseInt(id_group),
		id_event: parseInt(id_event),
	});

	res.json({ people: deletedPeople });
};
