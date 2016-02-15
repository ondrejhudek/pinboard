import React from 'react'

import FilterLink from '../../containers/todo/FilterLink'

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

const Footer = () => (
    <div>
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        <FilterLink filter="SHOW_COMPLETED">
            Completed
        </FilterLink>
    </div>
)

export default Footer
