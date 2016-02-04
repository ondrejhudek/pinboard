import React from 'react'
import { LeftNav } from 'material-ui'
import FontAwesome from 'react-fontawesome'

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
            <LeftNav open={this.state.open} className="sidebar" width={265}>
                <header>
                    <h1>
                        <FontAwesome name="hand-peace-o"/> hudyapp
                        <small>beta</small>
                    </h1>
                </header>

                <Menu/>

                <footer>
                    <p className="copyright">
                        &copy; 2016 Made with <FontAwesome name="heart"/> by Ondřej Hudek
                    </p>
                    <p className="github">
                        <a href="https://github.com/ondrejhudek/hudy-app">
                            <FontAwesome name="github" size="3x"/>
                        </a>
                    </p>
                </footer>
            </LeftNav>
        )
    }
}

export default Sidebar
