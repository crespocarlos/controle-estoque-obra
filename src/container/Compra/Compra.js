import React, { Component } from 'react'
import {
  Form,
  Button,
  Icon,
  Header
} from 'semantic-ui-react'
import CompraList from './CompraList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { comprasActions } from '../../store/compras'
import { getTiposProjeto } from '../../helpers/dropdown'
import { Link } from 'react-router-dom'
import { dateMask } from '../../utils/masks'
import MaskedInput from 'react-text-mask'

class Estoque extends Component {
  state = {
    data: '',
    ordemCompra: '',
    notaFiscal: '',
    projeto: ''
  }

  handleChange = (e, data) => {
    const name = data === undefined ? e.target.name : data.name
    const value = data === undefined ? e.target.value : data.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { data, ordemCompra, notaFiscal, projeto } = this.state
    this.props.fetchCompras(data, ordemCompra, notaFiscal, projeto)
  }

  render() {
    const { data, ordemCompra, notaFiscal, projeto } = this.state
    return (
      <React.Fragment>
        <Header as='h2' icon textAlign='center'>
          <Icon name='settings' />
          Compras
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input name='data' children={
              <MaskedInput
                placeholder='Data'
                name='data'
                value={data}
                mask={dateMask}
                onChange={this.handleChange} />
            } />
            <Form.Input placeholder='Ordem de Compra' name='ordemCompra' value={ordemCompra} onChange={this.handleChange} />
            <Form.Input placeholder='Nota Fiscal' name='notaFiscal' value={notaFiscal} onChange={this.handleChange} />
            <Form.Select placeholder='Projeto' name='projeto' options={getTiposProjeto()} value={projeto} onChange={this.handleChange} />
            <Button icon primary>
              <Icon name="search" />
            </Button>
          </Form.Group>
        </Form>
        <CompraList onSubmit={this.handleSubmit} />
        <Button as={Link} to={`/compra/new`} icon primary labelPosition='right'>
          <Icon name="plus" />
          Novo
        </Button>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCompras: comprasActions.fetchCompras
  }, dispatch)
}


export default connect(null, mapDispatchToProps)(Estoque)

