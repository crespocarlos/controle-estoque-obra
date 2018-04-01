import * as actionTypes from './actionTypes'
import moment from 'moment'

const compras = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMPRAS_SUCCESS:
      return action.compras
    case actionTypes.REMOVE_COMPRA_SUCCESS:
      const newState = state.splice()
      const index = state.findIndex(compra => {
        return compra._id === action.compra._id
      })
      newState.splice(index, 1);
      return newState
    default:
      return state
  }
}

const form = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMPRA_SUCCESS:
      return {
        ...state,
        values: {
          ...action.compra,
          data: moment(action.compra.data).format('DD/MM/YYYY'),
          mercadoria: {
            ...action.compra.mercadoria,
            dataCompra: moment(action.compra.mercadoria.dataCompra).format('DD/MM/YYYY')
          }
        },
        fields: {
          ...state.fields
        }
      }
    case actionTypes.FETCH_FORNECEDOR_SUCCESS:
      if (action.fornecedor === null) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          fornecedor: {
            ...action.fornecedor,
            telefone: action.fornecedor.telefone.replace(/(\(|\)|\s+|-)/g, ''),
            cep: action.fornecedor.cep.replace(/(\.|-)/g, '')
          }
        },
        fields: {
          ...state.fields
        }
      }
    default:
      return state
  }
}

export { compras, form }
