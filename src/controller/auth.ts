import { RequestHandler } from "express";
import { z } from "zod";

import * as auth from "../services/auth";

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });

  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados Inválidos" });

  // validar senha e gerar token
  if (!auth.validatePassword(body.data.password)) {
    
    return res.status(403).json({ error: "Acesso Negado" });
  }
  res.json({ token: auth.createToken()});
  // retornar requisição
};
