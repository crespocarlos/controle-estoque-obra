import React from 'react'
import {
  Form,
  Divider,
} from 'semantic-ui-react'
import { SemanticFormField, SemanticMaskedFormField, SemanticSelectFormField } from './SemanticUi'
import { cnpjMask, phoneMask, emailMask, cepMask } from '../utils/masks'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { required } from '../helpers/validations'
import { getUF } from '../helpers/dropdown'

const FornecedorFields = ({ onCpnjChange, ufs }) => {
  return (
    <div>
      <Divider section horizontal>Fornecedor</Divider>
      <Form.Group widths='equal'>
        <Field label='CNPJ' component={SemanticMaskedFormField} name="fornecedor.cnpj" placeholder="CNPJ" mask={cnpjMask} validate={required} onBlur={onCpnjChange} />
        <Field label='Fornecedor' component={SemanticFormField} name="fornecedor.nome" placeholder='Fornecedor' validate={required} maxLength="200" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field label='Fone' component={SemanticMaskedFormField} name="fornecedor.telefone" placeholder="Fone" mask={phoneMask} validate={required} />
        <Field label='Email' component={SemanticMaskedFormField} name="fornecedor.email" placeholder="Email" mask={emailMask} validate={required} maxLength="200" />
        <Field label='Contato' component={SemanticFormField} name="fornecedor.contato" placeholder='Contato' validate={required} maxLength="200" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field label='UF' component={SemanticSelectFormField} options={getUF()} name="fornecedor.estado" placeholder='UF' validate={required} />
        <Field label='Cidade' component={SemanticFormField} name="fornecedor.cidade" placeholder='Cidade' validate={required} maxLength="300" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field label='Endereço' component={SemanticFormField} name="fornecedor.endereco" placeholder='Endereço' validate={required} maxLength="300" />
        <Field label='CEP' component={SemanticMaskedFormField} name="fornecedor.cep" placeholder="CEP" mask={cepMask} validate={required} />
      </Form.Group>
    </div>
  )
}

FornecedorFields.propTypes = {
  onCpnjChange: PropTypes.func.isRequired
}

export default FornecedorFields


