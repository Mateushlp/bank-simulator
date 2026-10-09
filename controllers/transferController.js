import { transferService } from "../services/transferService.js";

export async function createTransfer(req, res) {
  try {
    const { emailOrigem, emailDestino, valor } = req.body;

    await transferService(emailOrigem, emailDestino, valor);

    return res.json({
      Aviso: "Transferência realizada com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message,
    });
  }
}
