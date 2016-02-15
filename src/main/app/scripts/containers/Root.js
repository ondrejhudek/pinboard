import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { __DEBUG } from '../../../../../config'
import DevTools from '../containers/DevTools'

class Root extends React.Component {
    get devTools() {
        if (__DEBUG) {
            return (
                <div style={{fontSize:13}}>
                    <DevTools/>
                </div>
            )
        }
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <div>
                    <Router history={this.props.history}>
                        {this.props.routes}
                    </Router>
                    {this.devTools}
                </div>
            </Provider>
        )
    }
}

export default Root
