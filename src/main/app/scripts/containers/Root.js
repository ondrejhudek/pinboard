import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

class Root extends React.Component {
  render () {
    return (
      <Provider store={this.props.store}>
          <Router history={this.props.history}>
              {this.props.routes}
          </Router>
      </Provider>
    )
  }
}

export default Root
