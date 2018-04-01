import React, { Component } from 'react'
import {
  Table,
  Button,
  Icon,
  Message,
  Confirm
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { comprasActions } from '../../store/compras'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getTiposProjeto } from '../../helpers/dropdown'
import toastr from 'toastr'

class CompraList extends Component {
  state = {
    openConfirm: false,
    currentId: ''
  }

  showConfirmDialog = (id) => {
    this.setState({
      openConfirm: true,
      currentId: id
    })
  }

  handleConfirm = () => {
    const { currentId } = this.state
    this.props.removeCompra(currentId)
      .then(() => {
        this.handleCancel()
        toastr.success('Registro excluído com sucesso!')
      })
      .catch(error => {
        toastr.error(error)
      })
  }

  handleCancel = () => this.setState({ openConfirm: false })

  componentWillMount() {
    this.props.fetchCompras()
  }

  formatNumber(num) {
    return `R$ ${num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`
  }

  formatProject(projetoId) {
    return getTiposProjeto().find((p) => p.value === projetoId).text
  }

  render() {
    const { openConfirm } = this.state
    const { compras } = this.props
    return (
      <div style={{ marginBottom: "20px" }}>
        <Confirm
          open={openConfirm}
          content='Deseja excluir o registro?'
          cancelButton='Não'
          confirmButton="Sim"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
        {compras.length === 0 ?
          <Message
            info
            header='Ops! Nada cadastrado ainda'
            content="Clique em novo e realize um novo cadastro de compras"
          /> :
          <Table striped={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data</Table.HeaderCell>
                <Table.HeaderCell>Nota Fiscal</Table.HeaderCell>
                <Table.HeaderCell>Fornecedor</Table.HeaderCell>
                <Table.HeaderCell>Ordem de Compra</Table.HeaderCell>
                <Table.HeaderCell>Produto</Table.HeaderCell>
                <Table.HeaderCell>Projeto</Table.HeaderCell>
                <Table.HeaderCell>Valor Total</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>

              {compras.map(p => (
                <Table.Row key={p._id}>
                  <Table.Cell singleLine>{moment(p.data).format('DD/MM/YYYY')}</Table.Cell>
                  <Table.Cell>
                    {p.notaFiscal}
                  </Table.Cell>
                  <Table.Cell>
                    {p.fornecedor.nome}
                  </Table.Cell>
                  <Table.Cell>
                    {p.mercadoria.ordemMercadoria}
                  </Table.Cell>
                  <Table.Cell>
                    {p.mercadoria.nome}
                  </Table.Cell>
                  <Table.Cell>
                    {this.formatProject(p.mercadoria.projeto)}
                  </Table.Cell>
                  <Table.Cell>
                    {this.formatNumber(p.mercadoria.valor * p.mercadoria.quantidade)}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button as={Link} to={`/compra/edit/${p._id}`} icon circular primary>
                      <Icon name="edit" />
                    </Button>
                    <Button icon circular color="red" onClick={() => this.showConfirmDialog(p._id)}>
                      <Icon name="remove" />
                    </Button>
                  </Table.Cell>
                </Table.Row>

              ))}
            </Table.Body>
          </Table>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    compras: state.compras
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeCompra: comprasActions.removeCompra,
    fetchCompras: comprasActions.fetchCompras
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompraList)

