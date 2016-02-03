import React from 'react'
import { Link } from 'react-router'
import { Card, FlatButton, RaisedButton, Snackbar } from 'material-ui'

import auth from '../auth/index'

class LostPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoHideDuration: 4000,
            message: 'Your password is "' + auth.getPassword() + '".',
            open: false
        };

        this.handleOpenPassword = this.handleOpenPassword.bind(this);
        this.handleClosePassword = this.handleClosePassword.bind(this);
    };

    handleOpenPassword() {
        this.setState({open: true});
    };

    handleClosePassword() {
        this.setState({open: false});
    };

    render() {
        return (
            <Card className="lost-password-box">
                <h1>Recover your password</h1>

                <div className="btn-password">
                    <RaisedButton label="Show password" secondary={true} onClick={this.handleOpenPassword}/>
                </div>

                <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={this.state.autoHideDuration} onRequestClose={this.handleClosePassword}/>

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
