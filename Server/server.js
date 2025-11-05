const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

const CLIENT_ID = "85a42cb58fac4da0ac43bf131b79dd2b";
const CLIENT_SECRET = "652e742bd56345a2944b06daa184e123";

// Configurar CORS
app.use(cors());

// Servir arquivos estáticos da pasta src
app.use(express.static(path.join(__dirname, "../src")));

app.get("/token", async (req, res) => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  res.json(data); // envia o access_token para o front-end
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
