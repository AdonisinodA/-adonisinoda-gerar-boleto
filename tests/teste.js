const { Boletos, Bancos } = require("../lib");
const dadosTeste = require("../teste.json");
const dadosTeste2 = require("../teste2.json");
const { writeFileSync } = require("fs");
const { join } = require("path");
const boletofunc = require("boletos-desc-br");

class Boleto {
  async boletoParaBuffer(gerarBoleto) {
    console.log(
      "🚀 ~ file: index.ts:8 ~ BoletoService ~ boletoParaBuffer ~ gerarBoleto:",
      gerarBoleto.banco
    );
    let buffer = "";
    const boleto = { ...gerarBoleto, banco: new Bancos[gerarBoleto.banco]() };

    const novoBoleto = new Boletos(boleto);
    novoBoleto.gerarBoleto();

    await novoBoleto
      .pdfDadosBase64()
      .then(({ base64 }) => {
        buffer = { base64, buffer: Buffer.from(base64) };
      })
      .catch((error) => {
        return error;
      });

    return buffer;
  }
}

const banco = new Boleto();
(async () => {
  //   const resultado = await banco.boletoParaBuffer(dadosTeste.boletos[0]);
  //   const pathCurrent = join(__dirname,"..", 'resultado.json')
  const teste = boletofunc.dadosBoleto(
    "00197954400000104700000002840572000150486517"
  ); // boleto válido
  //   const file = await writeFileSync(pathCurrent, resultado["base64"])
  console.log("🚀 ~ file: teste.js:39 ~ teste:", teste);
})();
