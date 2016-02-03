import React from 'react'
import { LeftNav } from 'material-ui'

import Menu from '../components/Menu'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    render() {
        return (
            <LeftNav open={this.state.open} className="sidebar">
                <header>
                    <h1>hudyapp <small>beta</small></h1>
                </header>
                <Menu/>
            </LeftNav>
        )
    }
}

export default Sidebar
