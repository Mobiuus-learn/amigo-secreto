import { z } from "zod";
import { RequestHandler } from "express";

import * as people from "./../services/people";

export const getAllPeople: RequestHandler = async (req, res) => {
  const { id_group, id_event } = req.params;

  const item = await people.getAllPeoples(
    parseInt(id_group),
    parseInt(id_event)
  );

  if (people) return res.json({ people: item });

  res.json({ error: "ocorreu um erro" });
};

export const getPeople: RequestHandler = async (req, res) => {
  const { id_groups, id_event, id } = req.params;

  const item = await people.getPeople(
    parseInt(id),
    parseInt(id_groups),
    parseInt(id_event)
  );

  if (item) return res.json({ peoples: item });

  res.json({ error: "ocorreu um erro" });
};

export const addPeople: RequestHandler = async (req, res) => {
  const { id_group, id_event } = req.params;
  const { name, cpf } = req.body;

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  const peopleSchema = z.object({
    id_group: z.number().optional(),
    id_event: z.number().optional(),
    name: z.string(),
    cpf: z
      .string({
        required_error: "CPF obrigatório",
        invalid_type_error: "CPF inválido",
      })
      .regex(cpfRegex),
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

  if (newPeople) return res.json({ people: newPeople });

  res.json({ error: "ocorreu um erro" + newPeople });
};

export const updatePeople: RequestHandler = async (req, res) => {
  const { id_groups, id_event, id } = req.params;
  const { name, cpf } = req.body;

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  const peopleSchema = z.object({
    id_group: z.number().optional(),
    id_event: z.number().optional(),
    name: z.string().optional(),
    cpf: z
      .string({
        required_error: "CPF obrigatório",
        invalid_type_error: "CPF inválido",
      })
      .regex(cpfRegex)
      .optional(),
  });

  const body = peopleSchema.safeParse(req.body);
  if (!body.success)
    return res.json({ error: "Dados inválidos. erro ao atualizar usuario" });

  const updatedPeople = await people.updatePeople(parseInt(id), body.data);

  res.json({ people: updatedPeople });
};

export const deletePeople: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedPeople = await people.deletePeople(parseInt(id));

  res.json({ people: deletedPeople });
};
