import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui'

const style = {
    tile: {
        textAlign: 'center'
    }
}

class DashboardView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            usersCount: props.usersCount,
            notesCount: props.notesCount,
            todosCount: props.todosCount,
            eventsCount: props.eventsCount
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            usersCount: nextProps.usersCount,
            notesCount: nextProps.notesCount,
            todosCount: nextProps.todosCount,
            eventsCount: nextProps.eventsCount
        })
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>

                <p>Hello guys, this application was mainly build as a practical part of my <strong>diploma thesis</strong>.</p>

                <p>The application is fully developed in React with predictable state container called Redux and many other components.</p>

                <p>The application works as your personal organizer. You can use tools like <Link to="note">Notes</Link>, <Link to="todo">Todo lists</Link> and <Link to="calendar">Calendar</Link>.</p>

                <h3>At the moment in the application there are in overall:</h3>

                <GridList cellHeight={120} cols={4} padding={10} className="grid-list">
                    <GridTile style={style.tile} className="tile tile-one">
                        <h4>{this.state.usersCount}</h4>
                        <p>registered users</p>
                    </GridTile>
                    <GridTile style={style.tile} className="tile tile-two">
                        <h4>{this.state.notesCount}</h4>
                        <p>notes</p>
                    </GridTile>
                    <GridTile style={style.tile} className="tile tile-three">
                        <h4>{this.state.todosCount}</h4>
                        <p>todo lists</p>
                    </GridTile>
                    <GridTile style={style.tile} className="tile tile-four">
                        <h4>{this.state.eventsCount}</h4>
                        <p>events</p>
                    </GridTile>
                </GridList>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersCount: state.users.items.length,
        notesCount: state.notes.items.length,
        todosCount: state.todos.items.length,
        eventsCount: state.events.items.length
    }
}

DashboardView = connect(mapStateToProps)(DashboardView)

export default DashboardView
