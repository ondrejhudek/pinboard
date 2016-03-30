import React from 'react';
import { connect } from 'react-redux'
import { Card, TextField, FlatButton, RaisedButton } from 'material-ui'

import auth from '../../services/auth/login'
import RegistrationDialog from './RegistrationDialog'
import { getUser } from '../../actions/user'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch,
            email: '',
            password: '',
            error: false,
            errorMsg: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLostPassword = this.handleLostPassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value, error: false, errorMsg: ''})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value, error: false, errorMsg: ''})
    }

    handleSubmit(e) {
        e.preventDefault()

        const userEmail = this.state.email.trim()
        const userPassword = this.state.password.trim()

        if (!userEmail || !userPassword) {
            this.setState({error: true, errorMsg: 'emptyCredentials'});
            return
        }

        auth.login(userEmail, userPassword, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({error: true, errorMsg: 'incorrectCredentials'})
            }

            const location = this.props

            if (location.state && location.state.nextPathname) {
                this.context.router.replace(location.state.nextPathname)
            } else {
                this.context.router.replace('/')
            }

            this.state.dispatch(getUser())
        })
    }

    handleLostPassword() {
        const location = this.props

        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname)
        } else {
            this.context.router.replace('/lost-password')
        }
    }

    handleRegister() {
        this.refs.dialog.open()
    }

    render() {
        let errorMessage = null
        if (this.state.error) {
            switch (this.state.errorMsg) {
                case 'emptyCredentials':
                    errorMessage = (<p>Please fill your email and password.</p>)
                    break

                case 'incorrectCredentials':
                    errorMessage = (<p>Your email or password is incorrect.</p>)
                    break
            }
        }

        return (
            <div>
                <Card className="login-box">
                    <header>
                        <h2>Sign in</h2>
                    </header>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField type="email" hintText="Your e-mail address" floatingLabelText="E-mail" value={this.state.email} onChange={this.handleEmailChange}/>
                        </div>
                        <div>
                            <TextField type="password" hintText="Your password" floatingLabelText="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>

                        <Card id="error-message" className={this.state.error ? "show" : ""}>
                            {errorMessage}
                        </Card>

                        <div className="btn-login">
                            <RaisedButton type="submit" label="Sign in" secondary={true}/>
                        </div>
                        <div className="btn-forgot-pw">
                            <FlatButton label="Forgot your password?" secondary={true} onClick={this.handleLostPassword}/>
                        </div>
                    </form>
                    <footer>
                        <p>Still don't have an account? <FlatButton label="Sign up right now!" primary={true} onClick={this.handleRegister}/></p>
                    </footer>
                </Card>

                <RegistrationDialog ref="dialog"/>
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}

Login = connect()(Login)

export default Login
