import React from 'react'
import { Link } from 'react-router'
import { Card, FlatButton } from 'material-ui'

import auth from '../services/auth/index'

class Logout extends React.Component {
    componentDidMount() {
        auth.logout()
    }

    render() {
        return (
            <Card className="logout-box">
                <p>You are now signed out.</p>
                <Link to="/">
                    <FlatButton label="Back to sign in" secondary={true}/>
                </Link>
            </Card>
        )
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Logout
