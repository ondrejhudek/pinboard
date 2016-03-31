import React from 'react'
import { Link } from 'react-router'
import { Card, RaisedButton } from 'material-ui'
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back'

class NotFoundView extends React.Component {
    render() {
        return (
            <Card className="card-404">
                <div className="button-back">
                    <Link to="/">
                        <RaisedButton label="Back to home" icon={<BackIcon/>}/>
                    </Link>
                </div>
            </Card>
        )
    }
}

export default NotFoundView
