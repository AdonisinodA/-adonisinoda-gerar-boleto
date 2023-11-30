const boletoBancoBrasil = require("../mock/bancoBrasil.json");
const boletoCaixa = require("../mock/bancoCaixa.json");
const { writeFileSync } = require("fs");
const { join } = require("path");
const { Bancos, Boletos } = require("../lib/index");

async function boletoParaBuffer(gerarBoleto, nomeArquivo) {
  let buffer = "";

  const fileCurrent = join(__dirname, "..", "mock", nomeArquivo);
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
// arquvivos gerado em base64
(async () => {
  await boletoParaBuffer(boletoCaixa.boletos[0], "resultadoBancoBrasil.txt");
  await boletoParaBuffer(
    boletoBancoBrasil.boletos[0],
    "resultadoBancoCaixa.txt"
  );
})();
