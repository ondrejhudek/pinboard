import React from 'react'
import { GridList, GridTile, List, ListItem, TextField, Checkbox, IconButton, RaisedButton  } from 'material-ui'

import { addTodo } from '../actions'
import AddTodo from '../containers/todo/AddTodo'
import VisibleTodoList from '../containers/todo/VisibleTodoList'
import Footer from '../components/todo/Footer'

const style = {
    gridTile: {
        width: '50%',
        border: '1px solid #eee',
        borderRadius: 2
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

class TodoView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="state-todo">
                <h2>Todos</h2>

                <GridTile style={style.gridTile}>
                    <List subheader={<AddTodo />} subheaderStyle={style.subheader}>
                        <VisibleTodoList />
                        <ListItem children={<Footer key={1}/>} disabled={true} style={style.footer}/>
                    </List>
                </GridTile>
            </div>
        )
    }
}

export default TodoView
