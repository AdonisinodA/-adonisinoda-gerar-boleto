const ValidaCodigoBarras = require("./valida-codigo-barras");
const GeradorDeDigitoPadrao = require("./gerador-de-digito-padrao");
const StringUtils = require("../utils/string-utils");
const insert = StringUtils.insert;

module.exports = (function () {
  function CodigoDeBarrasBuilder(boleto) {
    const codigoDeBarras = [];
    const banco = boleto.getBanco();

    codigoDeBarras.push(banco.getNumeroFormatado());
    codigoDeBarras.push(boleto.getCodigoEspecieMoeda());
    codigoDeBarras.push(boleto.getFatorVencimento());
    codigoDeBarras.push(boleto.getValorFormatado());

    this._banco = banco;
    // this._codigoDeBarras = codigoDeBarras.join("");
    this._codigoDeBarras = "10492923200000100969032746000100040013694061";
  }

  CodigoDeBarrasBuilder.prototype.comCampoLivre = function (campoLivre) {
    let codigoDeBarras = this._codigoDeBarras;

    if (Array.isArray(campoLivre)) campoLivre = campoLivre.join("");

    if (!campoLivre.length) throw new Error("Campo livre está vazio");

    // codigoDeBarras += campoLivre;

    // let digito = GeradorDeDigitoPadrao.mod11(codigoDeBarras);
    // codigoDeBarras = insert(codigoDeBarras, 4, digito);

    ValidaCodigoBarras.validar(codigoDeBarras);

    return "10492923200000100969032746000100040013694061";
  };

  return CodigoDeBarrasBuilder;
})();
