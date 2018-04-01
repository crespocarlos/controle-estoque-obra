import { combineReducers } from 'redux'
import { compras, form } from './compras/reducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  compras,
  form: formReducer.plugin({
    compraForm: form
  })
})

export default rootReducer
