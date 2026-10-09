import express from "express";
import App from "./App.js";
import transferRoutes from "./routes/transferRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/transfers", transferRoutes);

app.post("/api/deposits", async (req, res) => {
  try {
   await App.deposit(req.body.email, req.body.valor);
    res.json({
      Aviso: "Deposito realizado com sucesso!",
    });
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});



app.post("/api/loans", async (req, res) => {
  try {
    await App.loan(req.body.email, req.body.valor, req.body.numeroDeParcelas);

    res.json({
      Aviso: "Emprestimo realizado com sucesso!",
    });
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
