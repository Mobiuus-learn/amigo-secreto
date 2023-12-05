import { Router } from "express";
import * as auth from "../controller/auth"

const router = Router();

router.get("/ping", (req, res) => res.json({ message: "pong" }))

router.post('/login', auth.login)

export default router;