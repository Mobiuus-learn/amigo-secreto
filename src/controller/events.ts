import { RequestHandler } from "express";
import { z } from "zod";
import * as events from "../services/events";

export const getAll: RequestHandler = async (req, res) => {
  const items = await events.getAll();

  if (items) return res.json({ events: items });

  res.json({ error: "ocorreu um erro" });
};

export const getEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const eventItem = await events.getOne(parseInt(id));

  if (eventItem) return res.json({ event: eventItem });

  res.json({ error: "O Evento nao existe" });
};

export const addEvents: RequestHandler = async (req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = addEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newEvent = await events.add(body.data);

  if (newEvent) return res.status(201).json({ event: newEvent });

  res.json({ error: "ocorreu um erro" });
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatedEvent = await events.update(parseInt(id), body.data);

  if (updatedEvent) {
    if(updatedEvent.status){
      //TODO fazer o sorteio
    }else{
      //TODO remover o sorteio


    }
    
    return res.json({ event: updatedEvent });

  }

  res.json({ error: "ocorreu um erro" });

};
export const deleteEvent: RequestHandler =  async (req, res) =>{
  const { id } = req.params

  const deletedEvent = await events.deleteOne(parseInt(id))

  if(deletedEvent) return res.json({message: `Evento deletado ${deleteEvent}`})

  res.json({message: 'evento nao encontrado'})
}