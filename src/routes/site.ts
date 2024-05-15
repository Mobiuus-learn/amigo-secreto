import { Router } from "express";
import * as events from "./../controller/events";
import * as people from "./../controller/people";

const router = Router();

router.get("/ping", (req, res) => res.json({ message: "pong" }));

router.get("/events/:id", events.getEvent);
router.get("/events/:id_event/search", people.searchPerson);

export default router;
