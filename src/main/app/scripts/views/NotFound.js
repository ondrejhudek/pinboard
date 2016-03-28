import React from 'react'
import { Link } from 'react-router'
import { Card, FlatButton } from 'material-ui'

class NotFoundView extends React.Component {
    render() {
        return (
            <Card className="state-card">
                <h1>Error 404</h1>
                <h2>Page not found!</h2>
                <Link to="/">
                    <FlatButton label="Back to home" secondary={true}/>
                </Link>
            </Card>
        )
    }
}

export default NotFoundView
