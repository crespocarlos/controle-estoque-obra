import React from 'react'
import {
  Form,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { timeMask, plateMask } from '../utils/masks'
import { getAplicacoes } from '../helpers/dropdown'
import { connect } from 'react-redux'
import {
  SemanticMaskedFormField,
  SemanticSelectFormField,
  SemanticTextAreaFormField
} from './SemanticUi'
import { Field, formValueSelector } from 'redux-form'
import { required } from '../helpers/validations'

const ConcretagemFields = ({ aplicacoes, selectedAplicacao }) => {
  return (
    <div>
      <Form.Group widths='equal'>
        <Field label='Hora' component={SemanticMaskedFormField} mask={timeMask} name="mercadoria.concretagem.hora" placeholder='Hora' />
        <Field label='Placa Veículo' component={SemanticMaskedFormField} mask={plateMask} name="mercadoria.concretagem.placaVeiculo" placeholder='Placa Veículo' />
      </Form.Group>
      <Field label='Características do Produto' component={SemanticTextAreaFormField} placeholder='Detalhe o produto...' name="mercadoria.concretagem.caracteristica" />
      <Field label='Aplicação' component={SemanticSelectFormField} options={getAplicacoes()} name="mercadoria.concretagem.aplicacao" placeholder='Aplicação' validate={required} />
      {selectedAplicacao === 6 ?
        <Field label='Informe as tubulações' component={SemanticTextAreaFormField} placeholder='Detalhe as tubulações...' name="mercadoria.concretagem.detalheAplicacao" /> :
        null
      }
    </div>
  )
}

ConcretagemFields.propTypes = {
  selectedAplicacao: PropTypes.number.isRequired
}

const selector = formValueSelector('compraForm')

const mapStateToProps = (state, ownProps) => {
  const selectedAplicacao = selector(state, 'mercadoria.concretagem.aplicacao')
  return {
    selectedAplicacao
  }
}

export default connect(mapStateToProps, null)(ConcretagemFields)

