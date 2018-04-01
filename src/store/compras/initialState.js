const initialState = {
  compras: [],
  compra: {
    date: '',
    notaFiscal: ''
  },
  fornecedor: {
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    contato: '',
    localizacao: '',
    cep: ''
  },
  mercadoria: {
    nome: '',
    quantidade: '',
    unidadeMedida: '',
    valor: '',
    projeto: '',
    ordemMercadoria: '',
    quantidadeCompra: '',
    dataCompra: '',
    lanche: {
      nome: '',
      data: '',
      quantidade: '',
      valor: ''
    },
    concretagem: {
      dia: '',
      mes: '',
      carecteristica: '',
      hora: '',
      placaVeiculo: '',
      aplicacao: ''
    }
  }
}

export default initialState