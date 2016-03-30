import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { GridList, GridTile } from 'material-ui'

import { fetchStats } from '../actions/stats'
let fetched = false

const style = {
    tile: {
        textAlign: 'center'
    }
}

class DashboardView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch,
            users: {total: props.users.total},
            notes: {total: props.notes.total},
            todos: {total: props.todos.total},
            events: {total: props.events.total}
        }
    }

    componentWillMount() {
        if (!fetched) {
            this.state.dispatch(fetchStats())
            fetched = true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: {total: nextProps.users.total},
            notes: {total: nextProps.notes.total},
            todos: {total: nextProps.todos.total},
            events: {total: nextProps.events.total}
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
                        <h4>{this.state.users.total}</h4>
                        <p>registered users</p>
                    </GridTile>

                    <GridTile style={style.tile} className="tile tile-two">
                        <h4>{this.state.notes.total}</h4>
                        <p>notes</p>
                    </GridTile>

                    <GridTile style={style.tile} className="tile tile-three">
                        <h4>{this.state.todos.total}</h4>
                        <p>todo lists</p>
                    </GridTile>

                    <GridTile style={style.tile} className="tile tile-four">
                        <h4>{this.state.events.total}</h4>
                        <p>events</p>
                    </GridTile>
                </GridList>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: {total: state.stats.users.total},
        notes: {total: state.stats.notes.total},
        todos: {total: state.stats.todos.total},
        events: {total: state.stats.events.total}
    }
}

DashboardView = connect(mapStateToProps)(DashboardView)

export default DashboardView
