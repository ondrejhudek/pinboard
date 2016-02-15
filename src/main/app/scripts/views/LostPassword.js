import React from 'react'
import { Link } from 'react-router'
import { Card, FlatButton, RaisedButton, Snackbar } from 'material-ui'

import auth from '../services/auth/index'

class LostPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoHideDuration: 5000,
            message: 'Guest credentials are "guest@guest.com/guest".',
            open: false
        };

        this.handleOpenCredentials = this.handleOpenCredentials.bind(this);
        this.handleCloseCredentials = this.handleCloseCredentials.bind(this);
    };

    handleOpenCredentials() {
        this.setState({open: true});
    };

    handleCloseCredentials() {
        this.setState({open: false});
    };

    render() {
        return (
            <Card className="lost-password-box">
                <h1>Recover your password</h1>

                <p>If you don't have an account yet or forgot your password, you can use a guest user.</p>

                <div className="btn-password">
                    <RaisedButton label="Show guest credentials" secondary={true} onClick={this.handleOpenCredentials}/>
                </div>

                <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={this.state.autoHideDuration} onRequestClose={this.handleCloseCredentials}/>

                <div>
                    <Link to="/">
                        <FlatButton label="Back to sign in" secondary={true}/>
                    </Link>
                </div>
            </Card>
        )
    }
}

    export default LostPassword
