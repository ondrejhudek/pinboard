import React from 'react'
import { Link } from 'react-router'
import { MenuItem as MaterialMenuItem } from 'material-ui'

const style = {
    inner: {
        paddingLeft: 60
    },
    outer: {
        paddingLeft: 5
    },
    icon: {
        fontSize: 26
    }
}

class MenuItem extends React.Component {
    render() {
        return (
            <Link to={this.props.route}>
                <MaterialMenuItem primaryText={this.props.text} leftIcon={<this.props.icon/>} innerDivStyle={style.inner} style={style.outer}/>
            </Link>
        )
    }
}

export default MenuItem
