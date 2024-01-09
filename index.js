const { Resend } = require("resend");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const resend = new Resend(process.env.API_KEY);

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: process.env.DEFAULT_EMAIL,
      to: process.env.CLIENT_EMAIL,
      subject: `${name} - Contato`,
      html: `<h2>Olá! Gostaria de conversar sobre minha alimentação.</h2>
      <p>Meu nome: ${name}</p>
      <p>Meu e-mail: ${email}</p>
      <p>O que desejo: ${message}</p>
      `,
    });
    res.status(200).json({ message: "Enviado com sucesso." });
  } catch (error) {
    res.status(400).json({ error: "Erro ao enviar e-mail: " + error });
  }
});

app.get("/", async (req, res) => {
  res.status(200).json({ message: "opa" });
});

app.listen(PORT, () => {
  console.log("Server started");
});
