import React, { PropTypes } from 'react'
import { ListItem, Checkbox, IconButton } from 'material-ui'
import RemoveIcon from 'material-ui/lib/svg-icons/content/clear'

const style = {
    listItem: {
        paddingLeft: 54
    }
}

const TodoListItem = ({ text, completed, handleToggle, handleRemove }) => (
    <ListItem primaryText={text} innerDivStyle={style.listItem} className={(completed) ? "toggled" : ""} leftCheckbox={<Checkbox checked={completed} onClick={handleToggle}/>}
              rightIconButton={<RemoveIcon onClick={handleRemove} className="item-removeButton" hoverColor="#E91E63"/>}/>
)

TodoListItem.propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
}

export default TodoListItem
