import * as actionTypes from './actionTypes'
import API from '../../helpers/api'
import moment from 'moment'
import initialState from './initialState'

const replaceRegex = /(\.|\/|-)/g

const transformCompraData = (compra) => {
  const compraPayload = {
    data: moment(compra.data, 'DD/MM/YYYY'),
    notaFiscal: compra.notaFiscal,
    mercadoria: transformMercadoriaData(compra.mercadoria)
  }

  return compraPayload
}

const transformFornecedorData = (fornecedor) => {
  const fornecedorPayload = {
    cnpj: fornecedor.cnpj.replace(replaceRegex, ''),
    telefone: fornecedor.telefone,
    email: fornecedor.email,
    contato: fornecedor.contato,
    estado: fornecedor.estado,
    cidade: fornecedor.cidade,
    endereco: fornecedor.endereco,
    cep: fornecedor.cep.replace(replaceRegex, ''),
    nome: fornecedor.nome
  }

  return fornecedorPayload
}

const transformMercadoriaData = (mercadoria) => {
  let mercadoriaPayload = {
    nome: mercadoria.nome,
    quantidade: mercadoria.quantidade,
    unidadeMedida: mercadoria.unidadeMedida,
    valor: isNaN(Number(mercadoria.valor)) ? parseFloat(mercadoria.valor.replace('.', '').replace(',', '.')) : mercadoria.valor,
    projeto: mercadoria.projeto,
    ordemMercadoria: mercadoria.ordemMercadoria,
    quantidadeCompra: mercadoria.quantidadeCompra,
    dataCompra: moment(mercadoria.dataCompra, 'DD/MM/YYYY')
  }

  if (mercadoria.projeto === 14) {
    const concretagemPayload = {
      hora: mercadoria.concretagem.hora,
      placaVeiculo: mercadoria.concretagem.placaVeiculo,
      aplicacao: mercadoria.concretagem.aplicacao,
      caracteristica: mercadoria.concretagem.caracteristica,
      detalheAplicacao: mercadoria.concretagem.detalheAplicacao
    }

    Object.assign(mercadoriaPayload, { 'concretagem': concretagemPayload })
  }

  return mercadoriaPayload
}

const saveFornecedor = async (fornecedor, dispatch) => {
  dispatch({ type: actionTypes.SAVE_FORNECEDOR_REQUEST })

  const response = await API.post('api/fornecedores', transformFornecedorData(fornecedor))
  const data = response.data
  if (response.status >= 200 && response.status <= 300) {
    dispatch({ type: actionTypes.SAVE_FORNECEDOR_SUCCESS, fornecedor: data })
    return data
  }
}

export const fetchFornecedor = (cnpj) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_FORNECEDOR_REQUEST })

    if (!cnpj) {
      return dispatch({ type: actionTypes.FETCH_FORNECEDOR_SUCCESS, fornecedor: initialState.fornecedor })
    }
    const searchCnpj = cnpj.replace(replaceRegex, '')
    try {
      const response = await API.get(`api/fornecedores/${searchCnpj}`)
      initialState.fornecedor.cnpj = cnpj
      if (response.status === 200)
        return dispatch({ type: actionTypes.FETCH_FORNECEDOR_SUCCESS, fornecedor: response.data || initialState.fornecedor })
    } catch (e) {
      throw Error(e)
    }
  }
}

export const fetchCompra = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COMPRA_REQUEST })

    const response = await API.get(`api/compras/${id}`)
    if (response.status === 200)
      return dispatch({ type: actionTypes.FETCH_COMPRA_SUCCESS, compra: response.data || initialState.compra })
  }
}


export const fetchCompras = (...args) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COMPRAS_REQUEST })

    try {
      const response = await API.get(`api/compras/`, {
        params: {
          data: args[0],
          ordemMercadoria: args[1],
          notaFiscal: args[2],
          projeto: args[3]
        }
      })
      if (response.status === 200)
        return dispatch({ type: actionTypes.FETCH_COMPRAS_SUCCESS, compras: response.data || initialState.compras })
    } catch (e) {
      throw Error(e)
    }
  }
}

export const removeCompra = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_COMPRA_REQUEST })
    const response = await API.delete('api/compras/', {
      data: {
        id
      }
    })

    if (response.status >= 200 && response.status <= 300) {
      return dispatch({ type: actionTypes.REMOVE_COMPRA_SUCCESS, compra: { _id: id } })
    }
  }
}
export const saveCompra = (compra) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SAVE_COMPRA_REQUEST })

    const newFornecedor = await saveFornecedor(compra.fornecedor, dispatch)

    let response

    if (compra._id === undefined) {
      const newCompra = Object.assign(transformCompraData(compra), { fornecedor: newFornecedor.value._id })
      response = await API.post('api/compras', newCompra)
    } else {
      response = await API.put('api/compras', Object.assign({}, transformCompraData(compra), { _id: compra._id }))
    }

    const data = response.data
    if (response.status >= 200 && response.status <= 300) {
      return dispatch({ type: actionTypes.SAVE_COMPRA_SUCCESS, compra: data })
    }
  }
}