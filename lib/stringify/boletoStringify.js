const Boleto = require("../utils/functions/boletoUtils");

module.exports = class BoletoStringify {
  static enderecoPagador({ logradouro, bairro, cidade, estadoUF, cep }) {
    return Boleto.Endereco.novoEndereco()
      .comLogradouro(logradouro)
      .comBairro(bairro)
      .comCidade(cidade)
      .comUf(estadoUF)
      .comCep(cep);
  }

  static createPagador({
    endereco,
    nome,
    registroNacional,
    cpfcnpj,
    idUsuario,
  }) {
    const enderecoPagador = this.enderecoPagador(endereco);
    return Boleto.Pagador.novoPagador()
      .comNome(nome)
      .comRegistroNacional(registroNacional)
      .comIdUsuario(idUsuario)
      .comEndereco(enderecoPagador)
      .comCpfCnpj(cpfcnpj);
  }

  static createBeneficiario(
    { dadosBancarios, endereco, cnpj, nome },
    nomeBanco
  ) {
    const enderecoBeneficiario = this.enderecoPagador(endereco);

    let novoBeneficiario = Boleto.Beneficiario.novoBeneficiario()
      .comNome(nome)
      .comRegistroNacional(cnpj)
      .comCarteira(dadosBancarios.carteira, nomeBanco)
      .comAgencia(dadosBancarios.agencia)
      .comDigitoAgencia(dadosBancarios.agenciaDigito)
      .comCodigoBeneficiario(dadosBancarios.conta)
      .comDigitoCodigoBeneficiario(dadosBancarios.contaDigito)
      .comNossoNumero(dadosBancarios.nossoNumero, nomeBanco) //11 -digitos // "00000005752"
      .comDigitoNossoNumero(dadosBancarios.nossoNumeroDigito) // 1 digito // 8
      .comEndereco(enderecoBeneficiario);

    if (dadosBancarios.convenio) {
      novoBeneficiario.comNumeroConvenio(dadosBancarios.convenio);
    }

    return novoBeneficiario;
  }

  static createInstrucoes(instrucoes) {
    if (!Array.isArray(instrucoes)) {
      return [instrucoes];
    }
    return instrucoes;
  }
};
