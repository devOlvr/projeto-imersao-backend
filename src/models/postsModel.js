import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
// Importa a função que realiza a conexão com o banco de dados MongoDB, localizada no arquivo dbconfig.js.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados MongoDB utilizando a URL de conexão (geralmente armazenada em uma variável de ambiente, `process.env.STRING_CONEXAO`).

// Função assíncrona que busca todos os posts no banco de dados MongoDB.
export async function getTodosPosts() {
  const db = conexao.db("imersao-instabytes");
  // Acessa o banco de dados chamado "imersao-instabytes" utilizando a conexão previamente estabelecida.
  const colecao = db.collection("posts");
  // Acessa a coleção "posts" dentro do banco de dados, que contém os posts a serem recuperados.
  return colecao.find().toArray();
  // Realiza a busca de todos os documentos (posts) dentro da coleção "posts" e os converte para um array. Retorna esse array.
}

export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");

  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id);

  return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: novoPost });
}
