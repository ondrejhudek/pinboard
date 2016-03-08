import React, { PropTypes } from 'react'

import FilterLink from '../../containers/todo/FilterLink'

const Footer = ({ id, filter }) => (
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
    </div>
)

Footer.propTypes = {
    id: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired
}

export default Footer
