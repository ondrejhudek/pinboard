import React, { PropTypes } from 'react'
import { GridTile, List, ListItem } from 'material-ui'

import VisibleTodoList from '../../containers/todo/VisibleTodoList'
import AddTodoItem from '../../containers/todo/AddTodoItem'
import Footer from '../../components/todo/Footer'

const style = {
    gridTile: {
        display: 'inline-block',
        width: '48%',
        margin: '0.5%',
        verticalAlign: 'top',
        border: '1px solid #eee',
        borderRadius: 2,
        overflow: 'inherit'
    },
    list: {
        boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
    },
    subheader: {
        paddingTop: 5,
        paddingBottom: 2,
        paddingRight: 16
    },
    footer: {
        marginTop: 6,
        paddingTop: 12,
        paddingBottom: 8,
        borderTop: '1px solid #ddd'
    }
}

const Todo = ({ id, _id, todos, filter }) => {
    return (
        <GridTile style={style.gridTile}>
            <List style={style.list} subheader={<AddTodoItem id={id} objectId={_id}/>} subheaderStyle={style.subheader}>
                <VisibleTodoList id={id} objectId={_id} filter={filter} items={todos}/>
                <ListItem children={<Footer key={id} id={id} objectId={_id} filter={filter}/>} disabled={true} style={style.footer}/>
            </List>
        </GridTile>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired,
    filter: PropTypes.string.isRequired
}

export default Todo
