import React from 'react';
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

class Login extends React.Component {
    render() {
        return (
            <Card className="login-box">
                <header>
                    <h2>Sign in</h2>
                </header>
                <form onSubmit="">
                    <div>
                        <TextField hintText="Your e-mail address" floatingLabelText="E-mail"/>
                    </div>
                    <div>
                        <TextField hintText="Your password" floatingLabelText="Password" type="password"/>
                    </div>
                    <div className="btn-login">
                        <RaisedButton label="Sign in" secondary={true}/>
                    </div>
                    <div className="btn-forgot-pw">
                        <FlatButton label="Forgot your password?" secondary={true}/>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </form>
            </Card>
        )
    }
}

export default Login
