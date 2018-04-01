import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import thunk from 'redux-thunk'
import 'toastr/build/toastr.min.css'
import Routes from './routes'

require('dotenv').config({ path: '../.env' })

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    );
  }
}

export default App
