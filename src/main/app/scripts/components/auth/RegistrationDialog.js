import React, { PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Dialog, FlatButton, TextField, Card, Snackbar } from 'material-ui'
import ReCAPTCHA from 'react-google-recaptcha'

import { SITEKEY } from '../../../../../../config'
import auth from '../../services/auth/register'

const style = {
    dialogContent: {
        width: 500,
        maxWidth: 'none'
    },
    dialogBody: {
        padding: '0 50px 20px',
        textAlign: 'center'
    },
    headline: {
        margin: '1.5em 0 1em',
        textAlign: 'left',
        fontSize: '1.2em',
        fontWeight: '300'
    },
    recaptcha: {
        margin: '0 auto'
    }
}

const regex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z?!@#$%^&*+]{7,}$'
}

class RegistrationDialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            email: {
                value: null,
                valid: false
            },
            password: {
                value: null,
                valid: false
            },
            passwordConfirm: {
                value: null,
                valid: false
            },
            fetching: false,
            checked: false,
            valid: false,
            error: {
                status: false,
                type: null
            },
            snackbar: {
                message: '',
                open: false
            }
        }

        /* handle dialog */
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        /* handle fields */
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this)

        /* handle form */
        this.validateForm = this.validateForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reset = this.reset.bind(this)

        /* error handling */
        this.setError = this.setError.bind(this)
        this.resetError = this.resetError.bind(this)

        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    }

    open() {
        this.setState({open: true})
    }

    close() {
        this.setState({open: false}, this.reset())
    }

    handleEmailChange(e) {
        this.setState({email: {value: e.target.value, valid: !!e.target.value.match(regex.email)}}, this.validateForm)
    }

    handlePasswordChange(e) {
        this.setState({password: {value: e.target.value, valid: !!e.target.value.match(regex.password)}}, this.validateForm)
    }

    handlePasswordConfirmChange(e) {
        this.setState({passwordConfirm: {value: e.target.value, valid: !!(e.target.value.match(regex.password) && e.target.value === this.state.password.value)}}, this.validateForm)
    }

    handleRecaptchaChange() {
        this.setState({checked: true}, this.validateForm)
    }

    validateForm() {
        this.setState({valid: !!(this.state.email.valid && this.state.password.valid && this.state.passwordConfirm.valid && this.state.checked)})
    }

    handleSubmit() {
        this.setState({fetching: true})

        auth.emailExists(this.state.email.value)
            .then((data) => {
                if (data) {
                    this.setError('emailExists')
                    return
                } else {
                    this.resetError()
                }

                const user = {
                    email: this.state.email.value,
                    password: this.state.password.value
                }

                auth.register(user)
                    .then(() => {
                        this.setState({
                            snackbar: {
                                duration: 6000,
                                message: 'You have successfully signed up. You can sign in now.',
                                open: true
                            }
                        })
                    })
                    .then(() => this.close())
                    .catch((error) => {
                        this.setError('fetchError', error)
                        this.setState({fetching: false})
                    })
            })
            .then(() => {
                this.setState({fetching: false})
            })
            .catch((error) => {
                this.setError('fetchError', error)
                this.setState({fetching: false})
            })
    }

    reset() {
        this.setState({
            email: {value: null, valid: false},
            password: {value: null, valid: false},
            passwordConfirm: {value: null, valid: false},
            fetching: false,
            checked: false,
            valid: false,
            error: {status: false, type: null}
        })
    }

    handleCloseSnackbar() {
        this.setState({snackbar: {open: false, message: ''}})
    }

    /* error handling */
    setError(errorType, errorData = null) {
        this.setState({error: {status: true, type: errorType}})
        if (errorData) console.log(errorData)
    }

    resetError() {
        this.setState({error: {status: false, type: null}})
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" secondary={true} onClick={this.close}/>,
            <FlatButton label="Sign up" primary={true} onClick={this.handleSubmit} disabled={!this.state.valid || this.state.fetching}/>
        ]

        let errorMessage = null
        if (this.state.error.status) {
            switch (this.state.error.type) {
                case 'emailExists':
                    errorMessage = (<p>This email already exists.</p>)
                    break

                case 'fetchError':
                    errorMessage = (<p>Sorry, but something went wrong while fetching data from server. Please try it again or contact the administrator.</p>)
                    break
            }
        }

        return (
            <div>
                <Dialog title="Sign up for free" actions={actions} modal={true} open={this.state.open} contentClassName="register-box" contentStyle={style.dialogContent} bodyStyle={style.dialogBody}>
                    <div>
                        <TextField type="email" hintText="Your e-mail address" floatingLabelText="E-mail" fullWidth={true} value={this.state.email.value} onChange={this.handleEmailChange}/>
                    </div>
                    <div>
                        <TextField type="password" hintText="Your password" floatingLabelText="Password" fullWidth={true} value={this.state.password.value} onChange={this.handlePasswordChange}/>
                    </div>
                    <div>
                        <TextField type="password" hintText="Your password confirmation" floatingLabelText="Password confirmation" fullWidth={true} value={this.state.passwordConfirm.value}
                                   onChange={this.handlePasswordConfirmChange}/>
                    </div>

                    <h4 style={style.headline}>Are you human?</h4>
                    <ReCAPTCHA ref="recaptcha" sitekey={SITEKEY} onChange={this.handleRecaptchaChange} style={style.recaptcha}/>

                    <Card id="error-message" className={this.state.error ? "show" : ""}>
                        {errorMessage}
                    </Card>
                </Dialog>

                <Snackbar open={this.state.snackbar.open} message={this.state.snackbar.message} autoHideDuration={this.state.snackbar.duration} onRequestClose={this.handleCloseSnackbar}/>
            </div>
        )
    }
}

export default RegistrationDialog
