import React from 'react'
import {
  Form,
  Divider,
  Input,
  Label
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getTiposProjeto, getUnidadesMedida } from '../helpers/dropdown'
import { valueMask, dateMask } from '../utils/masks'
import ConcretageFields from './ConcretagemFields'
import { Field, formValueSelector } from 'redux-form'
import { required, isDate, isNumber } from '../helpers/validations'
import {
  SemanticFormField,
  SemanticMaskedFormField,
  SemanticMaskedPriceFormField,
  SemanticSelectFormField
} from './SemanticUi'
import MaskedInput from 'react-text-mask'

const MercadoriaFields = ({
  valorTotal,
  selectedProject }) => {

  return (
    <div style={{ marginBottom: "20px" }}>
      <Divider section horizontal>Dados da Compra</Divider>
      <Form.Group widths='equal'>
        <Field label='Ordem de Compra' component={SemanticFormField} name="mercadoria.ordemMercadoria" placeholder='Ordem de Compra' validate={required} />
        <Field label='Quantidade' component={SemanticFormField} name="mercadoria.quantidadeCompra" placeholder='Quantidade' validate={[required, isNumber]} maxLength="10" />
        <Field label='Data' component={SemanticMaskedFormField} name="mercadoria.dataCompra" placeholder='Data' mask={dateMask} validate={[required, isDate]} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field label='Projeto' component={SemanticSelectFormField} options={getTiposProjeto()} name="mercadoria.projeto" placeholder='Projeto' validate={required} />
        <Field label='Produto' component={SemanticFormField} name="mercadoria.nome" placeholder='Produto' validate={required} maxLength="200" />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field label="Quantidade" component={SemanticFormField} name="mercadoria.quantidade" placeholder='Quantidade' validate={[required, isNumber]} maxLength="10" />
        <Field label='Unidade Medida' component={SemanticSelectFormField} options={getUnidadesMedida()} name="mercadoria.unidadeMedida" placeholder='Unidade Medida' validate={required} />
        <Field label='Valor Unitário' component={SemanticMaskedPriceFormField} mask={valueMask} name="mercadoria.valor" placeholder='Valor Unitário' validate={required} maxLength="14" />
        <Form.Field>
          <label>Valor Total</label>
          <Input labelPosition='left'>
            <Label basic>R$</Label>
            <MaskedInput
              value={valorTotal}
              mask={valueMask}
              placeholder="Valor Total"
              readOnly
            />
          </Input>
        </Form.Field>
      </Form.Group>
      {selectedProject === 14 ?
        <ConcretageFields /> :
        null
      }
    </div>
  )
}

const selector = formValueSelector('compraForm')

const mapStateToProps = (state, ownProps) => {
  const valores = selector(state, 'mercadoria.quantidade', 'mercadoria.valor')
  const selectedProject = selector(state, 'mercadoria.projeto')

  function calcTotal(valores) {
    if (valores.mercadoria.quantidade === undefined || valores.mercadoria.valor === undefined)
      return 0
    return Number(valores.mercadoria.quantidade) * parseFloat(valores.mercadoria.valor.toString().replace(/\./g, '').replace(',', '.'))
  }

  return {
    selectedProject,
    valorTotal: Object.keys(valores).length !== 0 ?
      calcTotal(valores).toString().replace('.', ',') :
      undefined
  }
}

export default connect(mapStateToProps, null)(MercadoriaFields);

