import React, { Component } from 'react'
import CompraForm from './CompraForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { comprasActions } from '../../store/compras'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'

class CompraEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if (this.props.match.params['id'] === undefined) {
      this.context.router.history.replace('/404')
    }

  }
  componentDidMount() {
    if (this.props.match.params['id'] !== undefined) {
      this.props.fetchCompra(this.props.match.params.id)
        .catch(e => {
          this.context.router.history.replace('/404')
        })
    }
  }

  handleSubmit = (u) => {
    this.props.saveCompra(u)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error)
      })

  }

  redirect() {
    toastr.success('Dados salvos com sucesso.');
    this.context.router.history.push('/');
  }

  render() {
    return (
      <CompraForm onSubmit={this.handleSubmit} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveCompra: comprasActions.saveCompra,
    fetchCompra: comprasActions.fetchCompra
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(CompraEdit))

