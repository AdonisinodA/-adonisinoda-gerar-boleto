interface boleto {
  banco: string; // exemplo : new Bancos.Caixa()
  codigoDeBarras: string;
  descricaoLocalDePagamento: string[];
  pagador: {
    idUsuario: string; // caso tenha algum identificador para o pagador
    nome: string;
    cpfcnpj: string;
    endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      estadoUF: string;
      cep: string;
    };
  };
  instrucoes: string[];
  beneficiario: {
    nome: string;
    cnpj: string;
    dadosBancarios: {
      carteira: string;
      agencia: string;
      agenciaDigito: string;
      conta: string;
      contaDigito: string;
      nossoNumero: string;
    };
    endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      estadoUF: string;
      cep: string;
    };
  };
  boleto: {
    numeroDocumento: string;
    especieDocumento: string;
    valor: number;
    datas: {
      vencimento: string;
      processamento: string;
      documentos: string;
    };
  };
}
