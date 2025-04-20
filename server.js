const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Tenta localizar qual pasta contém o frontend: build, dist ou public
const candidates = ["build", "dist", "public"];
const folder = candidates.find(folder => fs.existsSync(path.join(__dirname, folder, "index.html")));

if (!folder) {
  console.error("❌ Nenhuma pasta de frontend encontrada com index.html.");
  process.exit(1);
}

console.log(`✅ Servindo arquivos da pasta: ${folder}`);
app.use(express.static(path.join(__dirname, folder)));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, folder, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
