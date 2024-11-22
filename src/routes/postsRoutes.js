import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postsController.js";

// Configura o armazenamento do Multer para salvar os arquivos no sistema de arquivos.
const storage = multer.diskStorage({
  // Define o diretório onde os arquivos enviados serão salvos.
  destination: function (req, file, cb) {
    // 'cb(null, "uploads/")' indica que o arquivo será salvo na pasta "uploads".
    cb(null, "uploads/");
  },
  // Define o nome do arquivo. O Multer usa o nome original do arquivo enviado.
  filename: function (req, file, cb) {
    // 'cb(null, file.originalname)' faz com que o arquivo seja salvo com o nome original que foi enviado pelo cliente.
    cb(null, file.originalname);
  },
});

// Cria a configuração do Multer com as opções definidas para armazenamento de arquivos.
const upload = multer({
  dest: "./uploads",
  // Define o diretório de destino padrão para os arquivos (mas esse campo é substituído pela configuração do storage).
  storage,
  // Passa a configuração do storage (definida anteriormente) para o Multer, especificando como os arquivos serão armazenados.
});

const routes = (app) => {
  // Configura o Express para poder processar requisições JSON (necessário para que os dados enviados em requisições POST ou PUT sejam entendidos).
  app.use(express.json());
  app.use(cors(corsOptions));

  // Criação da rota
  app.get("/posts", listarPosts); // Buscar todos os posts
  app.post("/posts", postarNovoPost); // Criar novo post
  app.post("/upload", upload.single("imagem"), uploadImagem); // Criar novo post
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
