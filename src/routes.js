import React, { Component } from 'react'
import { Compra, CompraEdit } from './container/Compra'
import NotFound from './container/Common/NotFound'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default class Routes extends Component {

  constructor() {
    super()
    // Configure routes here as this solves a problem with hot loading where
    // the routes are recreated each time.
    this.routes = (
      <Container style={{ padding: "20px 0" }}>
        <Route exact path="/" component={Compra} />
        <Route exact path="/compra/new" component={CompraEdit} />
        <Route exact path="/compra/edit/:id" component={CompraEdit} />
        <Route path="/404" component={NotFound} />
      </Container>
    )
  }

  render() {
    return (
      <Router>
        {this.routes}
      </Router >
    );
  }
}