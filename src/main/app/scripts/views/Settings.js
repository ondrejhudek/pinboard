import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'

import { updateUser } from '../actions/user'

class SettingsView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch,
            user: props.user
        }

        this.handleFirstnameChange = this.handleFirstnameChange.bind(this)
        this.handleLastnameChange = this.handleLastnameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        })
    }

    handleFirstnameChange(e) {
        this.setState({
            user: {
                _id: this.state.user._id,
                email: this.state.user.email,
                password: this.state.user.password,
                firstname: e.target.value,
                lastname: this.state.user.lastname
            }
        })
    }

    handleLastnameChange(e) {
        this.setState({
            user: {
                _id: this.state.user._id,
                email: this.state.user.email,
                password: this.state.user.password,
                firstname: this.state.user.firstname,
                lastname: e.target.value
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.state.dispatch(updateUser(this.state.user))
    }

    render() {
        return (
            <div className="view-settings">
                <h2>Update your personal details</h2>

                <Card>
                    <CardText className="card-text">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <TextField hintText="Your first name" floatingLabelText="First name" value={this.state.user.firstname} onChange={this.handleFirstnameChange}/>
                            </div>
                            <div>
                                <TextField hintText="Your last name" floatingLabelText="Last name" value={this.state.user.lastname} onChange={this.handleLastnameChange}/>
                            </div>

                            <div className="col-submit">
                                <RaisedButton type="submit" label="Save" secondary={true}/>
                            </div>
                        </form>
                    </CardText>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.data
    }
}

SettingsView = connect(mapStateToProps)(SettingsView)

export default SettingsView
