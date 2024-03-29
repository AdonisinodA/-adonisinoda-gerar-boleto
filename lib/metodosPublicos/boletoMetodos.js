const fs = require("fs");
const Boleto = require("../utils/functions/boletoUtils");
const BoletoStringify = require("../stringify/boletoStringify");

module.exports = class Boletos {
  constructor({
    banco,
    pagador,
    boleto,
    beneficiario,
    instrucoes,
    descricaoLocalDePagamento,
    codigoDeBarras,
  }) {
    this.banco = banco;
    this.pagador = pagador;
    this.boleto = boleto;
    this.beneficiario = beneficiario;
    this.instrucoes = instrucoes;
    this.descricaoLocalDePagamento = descricaoLocalDePagamento;
    this.codigoDeBarras = codigoDeBarras;
    this.boletoInfo;
  }

  gerarBoleto() {
    const dataInstance = Boleto.Datas;
    const { datas, valor, especieDocumento, numeroDocumento } = this.boleto;

    this.boletoInfo = Boleto.Boleto.novoBoleto()
      .comLocaisDePagamento(this.descricaoLocalDePagamento)
      .comDatas(
        dataInstance
          .novasDatas()
          .comVencimento(datas.vencimento)
          .comProcessamento(datas.processamento)
          .comDocumento(datas.documentos)
      )
      .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario,this.banco.constructor.name))
      .comPagador(BoletoStringify.createPagador(this.pagador))
      .comBanco(this.banco)
      .comValorBoleto(parseFloat(valor).toFixed(2))
      .comNumeroDoDocumento(numeroDocumento)
      .comCodigoDeBarras(this.codigoDeBarras)
      .comEspecieDocumento(especieDocumento)
      .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes));
  }

  pdfDadosBase64() {
    return new Promise((resolve) =>
      new Boleto.Gerador(this.boletoInfo)
        .gerarPDF({
          creditos: "",
          base64: true,
        })
        .then((dado) => resolve({ base64: dado }))
    );
  }

  pdfFileComStream(dir = "./tmp/boletos", filename = "boleto") {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const stream = fs.createWriteStream(`${dir}/${filename}.pdf`);

    return new Promise((resolve) =>
      new Boleto.Gerador(this.boletoInfo)
        .gerarPDF({
          creditos: "",
          stream,
        })
        .then(() => resolve({ boleto: this.boleto, stream }))
    );
  }

  pdfEStream(stream) {
    return new Promise((resolve) =>
      new Boleto.Gerador(this.boletoInfo)
        .gerarPDF({
          creditos: "",
          stream,
        })
        .then(() => resolve({ boleto: this.boleto, stream }))
    );
  }
};
