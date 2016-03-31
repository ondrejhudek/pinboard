import React from 'react'
import { Link } from 'react-router'
import { Card, RaisedButton } from 'material-ui'
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back'

import auth from '../services/auth/login'

class Logout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        auth.logout()
    }

    render() {
        return (
            <Card className="card-logout">
                <div className="button-back">
                    <Link to="/">
                        <RaisedButton label="Back to sign in" icon={<BackIcon/>}/>
                    </Link>
                </div>
            </Card>
        )
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Logout
