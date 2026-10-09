import { Router } from "express";
import { createTransfer } from "../controllers/transferController.js";

const router = Router();

router.post("/", createTransfer);

export default router;
