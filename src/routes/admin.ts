import { Router } from "express";
import * as events from './../controller/events';
import * as auth from "../controller/auth"

const router = Router();

router.post('/login', auth.login)

router.get("/ping", auth.validate, (req, res) => res.json({ pong: "true", admin: "true" }))

router.get('/events', auth.validate, events.getAll)

router.get('/events/:id', auth.validate, events.getEvent)

export default router;