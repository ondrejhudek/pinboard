import React, { PropTypes } from 'react'
import { ListItem, Checkbox, IconButton } from 'material-ui'

const style = {
    listItem: {
        paddingLeft: 54
    }
}

const Todo = ({ handleClick, completed, text }) => (
    <ListItem primaryText={text} innerDivStyle={style.listItem} leftCheckbox={<Checkbox checked={completed}/>} onClick={handleClick}/>
)

Todo.propTypes = {
    handleClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo
