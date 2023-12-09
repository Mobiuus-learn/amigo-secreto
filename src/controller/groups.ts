import { RequestHandler } from "express";
import * as groups from './../services/groups'

export const getAllGroups: RequestHandler = async (req, res) =>{
  const {id_event} = req.params

  const items = await groups.getAllGroups(parseInt(id_event))

  if(!items) return res.json({error: 'ocorreu um erro'})

  res.json({groups: items})
  
}

export const getGroup: RequestHandler = async (req, res) =>{
  const {id_event, id} = req.params

  const item = await groups.getGroup({
    id: parseInt(id),
    id_event: parseInt(id_event), 
  })
  if(item) return res.json({group: item})
  
  res.json({error: 'ocorreu um erro'})
}

export const addGroup: RequestHandler = async (req, res) =>{
  const {id_event} = req.params
  const {name} = req.body

  const newGroup = await groups.add(parseInt(id_event), name)

  if(newGroup) return res.json({group: newGroup})
  
  res.json({error: 'ocorreu um erro'})
}

export const updateGroup: RequestHandler = async (req, res) =>{
  const {id_event, id} = req.params
  const {name} = req.body

  const updatedGroup = await groups.updateGroup(parseInt(id), parseInt(id_event), name)

  if(updatedGroup) return res.json({group: updatedGroup})
  
  res.json({error: 'ocorreu um erro'})
}

export const deleteGroup : RequestHandler = async (req, res) =>{
  const {id_event, id} = req.params

  const deletedGroup = await groups.deleteGroup(parseInt(id))

  if(deletedGroup) return res.json({group: deletedGroup})
  
  res.json({error: 'ocorreu um erro'})
}