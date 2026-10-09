import { Router } from "express";
import App from "../App.js";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const usuarios = await App.getUsers();
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar usuários.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const usuario = await App.createUser(req.body.nome, req.body.email);

    return res.status(201).json({
      Aviso: "Usuário criado com sucesso!",
      usuario: usuario,
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message,
    });
  }
});
export default router;
