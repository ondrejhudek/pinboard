import React, { PropTypes } from 'react'
import { RaisedButton, FlatButton } from 'material-ui'

const style = {
    button: {
        minWidth: 'auto',
        height: 'auto',
        marginLeft: 5,
        marginRight: 5
    },
    buttonLabel: {
        padding: 10,
        fontSize: 11,
        lineHeight: 2.5
    }
};

const Link = ({ active, children, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault()
        onClick()
    }

    return (
        <RaisedButton label={children} style={style.button} labelStyle={style.buttonLabel} onClick={handleClick} disabled={active}/>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link
