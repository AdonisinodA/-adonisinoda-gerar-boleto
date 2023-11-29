const teste = require("./teste.json");
const teste1 = require("./teste2.json");
const { writeFileSync } = require("fs");
const { join } = require("path");
const { Bancos, Boletos } = require("./lib/index");

async function boletoParaBuffer(gerarBoleto) {
  let buffer = "";

  const fileCurrent = join(__dirname, "resultado.txt");
  const boleto = { ...gerarBoleto, banco: new Bancos[gerarBoleto.banco]() };

  const novoBoleto = new Boletos(boleto);
  novoBoleto.gerarBoleto();

  await novoBoleto
    .pdfDadosBase64()
    .then(({ base64 }) => {
      writeFileSync(fileCurrent, base64);
    })
    .catch((error) => {
      return error;
    });

  return buffer;
}

(async () => {
  await boletoParaBuffer(teste.boletos[0]);
})();
