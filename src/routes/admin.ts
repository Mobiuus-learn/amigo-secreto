import { Router } from "express";
import * as events from "./../controller/events";
import * as auth from "../controller/auth";
import * as groups from './..//controller/groups'

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validate, (req, res) =>
  res.json({ pong: "true", admin: "true" })
);

// Events routers
router.get("/events", auth.validate, events.getAll);
router.get("/events/:id", auth.validate, events.getEvent);
router.post("/events", auth.validate, events.addEvents);
router.put("/events/:id", auth.validate, events.updateEvent);
router.delete("/events/:id", auth.validate, events.deleteEvent);

// Groups routers

router.get('/events/:id_event/groups', auth.validate, groups.getAllGroups)
router.get ('/events/:id_event/groups/:id', auth.validate, groups.getGroup)
router.post('/events/:id_event/groups', auth.validate, groups.addGroup)
router.put('/events/:id_event/groups/:id', auth.validate, groups.updateGroup)
router.delete('/events/:id_event/groups/:id', auth.validate, groups.deleteGroup)

export default router;
