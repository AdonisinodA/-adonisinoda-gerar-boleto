const formatarLinhaDigitavel =
  require("../utils/functions/formatacoesUtils").linhaDigitavel;
const ValidaCodigoBarras = require("./valida-codigo-barras");
const GeradorDeDigitoPadrao = require("./gerador-de-digito-padrao");
const boletofunc = require("boletos-desc-br");

module.exports = function (codigoDeBarras) {
  // console.log("🚀 ~ file: gerador-de-linha-digitavel.js:8 ~ banco:", banco);
  // ValidaCodigoBarras.validar(codigoDeBarras);

  // const linhaDigitavel = [];

  // linhaDigitavel.push(codigoDeBarras.substring(0, 3));
  // linhaDigitavel.push(codigoDeBarras.substring(3, 4));
  // linhaDigitavel.push(codigoDeBarras.substring(19, 24));
  // linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(linhaDigitavel.join("")));

  // linhaDigitavel.push(codigoDeBarras.substring(24, 34));
  // linhaDigitavel.push(
  //   GeradorDeDigitoPadrao.mod10(linhaDigitavel.join("").substring(10, 20))
  // );

  // linhaDigitavel.push(codigoDeBarras.substring(34));
  // linhaDigitavel.push(
  //   GeradorDeDigitoPadrao.mod10(linhaDigitavel.join("").substring(21, 31))
  // );

  // linhaDigitavel.push(codigoDeBarras.substring(4, 5));
  // linhaDigitavel.push(codigoDeBarras.substring(5, 9));
  // linhaDigitavel.push(codigoDeBarras.substring(9, 19));
  // console.log(
  //   "🚀 ~ file: gerador-de-linha-digitavel.js:31 ~ linhaDigitavel:",
  //   linhaDigitavel
  // );

  const { linhaDigitavel } = boletofunc.dadosBoleto(codigoDeBarras);
  const resultado = formatarLinhaDigitavel(linhaDigitavel);
  return resultado;
};
