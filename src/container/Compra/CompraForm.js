import React, { Component } from 'react'
import {
  Button,
  Form
} from 'semantic-ui-react'
import { SemanticFormField, SemanticMaskedFormField } from '../../components/SemanticUi'
import MercadoriaFields from '../../components/MercadoriaFields'
import FornecedorFields from '../../components/FornecedorFields'
import { dateMask } from '../../utils/masks'
import { required, isDate } from '../../helpers/validations'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { comprasActions } from '../../store/compras'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

class CompraForm extends Component {

  handleValorMercadoriaChange = (e, data) => {
    const { mercadoria } = this.state
    const valorTotal = Math.round(parseFloat(e.target.value !== undefined ? e.target.value.replace(',', '.') : 0) * Number(mercadoria.quantidade || 0) * 100) / 100

    this.setState({
      mercadoria: {
        ...mercadoria,
        [e.target.name]: e.target.value,
        valorTotal: valorTotal.toString().replace('.', ',')
      }
    })
  }

  handleCnpjChange = (e) => {
    this.props.fetchFornecedor(e.target.value)
  }

  render() {
    const { handleSubmit, pristine, submitting, onSubmit } = this.props

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <Field label='Data' component={SemanticMaskedFormField} name="data" placeholder='Data' mask={dateMask} validate={[required, isDate]} />
            <Field label='Nota Fiscal' component={SemanticFormField} name="notaFiscal" placeholder='Nota Fiscal' validate={required} />
          </Form.Group>
          <FornecedorFields onCpnjChange={this.handleCnpjChange} />
          <MercadoriaFields />
          <Button.Group>
            <Button as={Link} to={`/`}>Voltar</Button>
            <Button.Or text='ou' />
            <Button primary loading={submitting} disabled={pristine || submitting}>Salvar</Button>
          </Button.Group>
        </Form>
      </React.Fragment>
    )
  }
}

CompraForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchFornecedor: comprasActions.fetchFornecedor
  }, dispatch)
}

export default compose(
  reduxForm({
    form: 'compraForm',
    enableReinitialize: true
  }),
  connect(null, mapDispatchToProps)
)(CompraForm)


