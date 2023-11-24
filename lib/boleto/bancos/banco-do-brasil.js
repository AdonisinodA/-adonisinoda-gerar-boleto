const path = require("path");
const StringUtils = require("../../utils/string-utils");
const pad = StringUtils.pad;

const CodigoDeBarrasBuilder = require("../codigo-de-barras-builder");

var BancoBrasil = (function () {
  var NUMERO_BANCO_BRASIL = "001",
    DIGITO_BANCO_BRASIL = "9";

  function BancoBrasil() {}

  BancoBrasil.prototype.getTitulos = function () {
    return {
      instrucoes: "Informações de responsabilidade do beneficiário",
      nomeDoPagador: "Pagador",
      especie: "Moeda",
      quantidade: "Quantidade",
      valor: "Valor",
      moraMulta: "(+) Juros / Multa",
    };
  };

  BancoBrasil.prototype.exibirReciboDoPagadorCompleto = function () {
    return true;
  };

  BancoBrasil.prototype.exibirCampoCip = function () {
    return false;
  };

  BancoBrasil.prototype.geraCodigoDeBarrasPara = function (boleto) {
    const beneficiario = boleto.getBeneficiario();

    const campoLivre = [];
    const nossoNumero =
      beneficiario.getNossoNumero()[0] === "/"
        ? beneficiario.getNossoNumero().substring(1)
        : beneficiario.getNossoNumero();
    console.log(
      "🚀 ~ file: banco-do-brasil.js:37 ~ BancoBrasil ~ nossoNumero:",
      nossoNumero
    );

    console.log(
      "🚀 ~ file: banco-do-brasil.js:37 ~ BancoBrasil ~ beneficiario.getNossoNumero():",
      beneficiario.getNossoNumero().length
    );
    if (nossoNumero.length == 11) {
      campoLivre.push(nossoNumero);
      campoLivre.push(beneficiario.getAgenciaFormatada());
      campoLivre.push(beneficiario.getCodigoBeneficiario());
      campoLivre.push(beneficiario.getCarteira().substring(0, 2));
    } else if (nossoNumero.length == 17) {
      campoLivre.push("000000");
      campoLivre.push(nossoNumero);
      campoLivre.push(beneficiario.getCarteira().substring(0, 2));
    }
    console.log(
      "🚀 ~ file: banco-do-brasil.js:49 ~ BancoBrasil ~ campoLivre:",
      campoLivre
    );

    return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
  };

  BancoBrasil.prototype.getNumeroFormatadoComDigito = function () {
    return [NUMERO_BANCO_BRASIL, DIGITO_BANCO_BRASIL].join("-");
  };

  BancoBrasil.prototype.getNumeroFormatado = function () {
    return NUMERO_BANCO_BRASIL;
  };

  BancoBrasil.prototype.getCarteiraFormatado = function (beneficiario) {
    return pad(beneficiario.getCarteira(), 2, "0");
  };

  BancoBrasil.prototype.getCarteiraTexto = function (beneficiario) {
    return pad(beneficiario.getCarteira(), 2, "0");
  };

  BancoBrasil.prototype.getCodigoFormatado = function (beneficiario) {
    return pad(beneficiario.getCodigoBeneficiario(), 7, "0");
  };

  BancoBrasil.prototype.getImagem = function () {
    return path.join(__dirname, "logotipos/banco-do-brasil.png");
  };

  BancoBrasil.prototype.getNossoNumeroFormatado = function (beneficiario) {
    return pad(beneficiario.getNossoNumero(), 17, "0");
  };

  BancoBrasil.prototype.getNossoNumeroECodigoDocumento = function (boleto) {
    var beneficiario = boleto.getBeneficiario();

    return [this.getNossoNumeroFormatado(beneficiario)].join("-");
  };

  BancoBrasil.prototype.getNome = function () {
    return "Banco do Brasil S.A.";
  };

  BancoBrasil.prototype.getImprimirNome = function () {
    return false;
  };

  BancoBrasil.prototype.getAgenciaECodigoBeneficiario = function (boleto) {
    var beneficiario = boleto.getBeneficiario(),
      codigo = this.getCodigoFormatado(beneficiario),
      digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

    if (digitoCodigo) {
      codigo += "-" + digitoCodigo;
    }

    return beneficiario.getAgenciaFormatada() + "/" + codigo;
  };

  BancoBrasil.novoBancoBrasil = function () {
    return new BancoBrasil();
  };

  return BancoBrasil;
})();

module.exports = BancoBrasil;
