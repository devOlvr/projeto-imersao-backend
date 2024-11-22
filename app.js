import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);
// Cria uma instância do Express, que será usada para configurar o servidor e as rotas.

// Criação do servidor!
app.listen(3000, () => {
  // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver rodando.
  console.log("Servidor escutando...");
});
