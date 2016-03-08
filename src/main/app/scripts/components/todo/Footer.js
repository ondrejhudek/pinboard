import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FlatButton } from 'material-ui'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

import FilterLink from '../../containers/todo/FilterLink'
import { removeTodo } from '../../actions/todos'

const style = {
    removeButton: {
        float: 'right'
    }
}

let Footer = ({ dispatch, id, objectId, filter }) => {
    const handleRemove = () => {
        dispatch(removeTodo(id, objectId))
    }

    return (
        <div>
            <FilterLink filter="SHOW_ALL" id={id} visibilityFilter={filter}>
                All
            </FilterLink>
            <FilterLink filter="SHOW_ACTIVE" id={id} visibilityFilter={filter}>
                Active
            </FilterLink>
            <FilterLink filter="SHOW_COMPLETED" id={id} visibilityFilter={filter}>
                Completed
            </FilterLink>

            <FlatButton label="Remove" primary={true} onClick={handleRemove} icon={<DeleteIcon />} style={style.removeButton}/>
            <div className="clearfix"></div>
        </div>
    )
}

Footer.propTypes = {
    id: PropTypes.number.isRequired,
    objectId: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
}

Footer = connect()(Footer)

export default Footer
