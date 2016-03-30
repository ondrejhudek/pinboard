import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardTitle, CardText, GridList, GridTile } from 'material-ui'

import { getWelcomeDate } from '../components/Util'
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
            date: getWelcomeDate(),
            user: props.user,
            stats: {
                users: {total: props.stats.users.total},
                notes: {total: props.stats.notes.total},
                todos: {total: props.stats.todos.total},
                events: {total: props.stats.events.total}
            }
        }
    }

    componentWillMount() {
        if (!fetched) {
            this.state.dispatch(fetchStats())
            fetched = true
        }

        setInterval(() => {
            this.setState({date: getWelcomeDate()})
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
            stats: {
                users: {total: nextProps.stats.users.total},
                notes: {total: nextProps.stats.notes.total},
                todos: {total: nextProps.stats.todos.total},
                events: {total: nextProps.stats.events.total}
            }
        })
    }

    render() {
        return (
            <div className="view-dashboard">
                <h2>Dashboard</h2>

                <Card className="card">
                    <CardTitle className="card-title" title={"Hello, welcome back" + ((this.state.user.firstname) ? " " + this.state.user.firstname : "") + "!"}
                               subtitle={this.state.date}/>

                    <CardText className="card-text">
                        <p>This application was mainly build as a practical part of my <strong>diploma thesis</strong>.</p>

                        <p>The application is fully developed in React with predictable state container called Redux and many other components.</p>

                        <p>The application works as your personal organizer. You can use tools like <Link to="note"><strong>Notes</strong></Link>, <Link to="todo"><strong>Todo lists</strong></Link> and <Link
                            to="calendar"><strong>Calendar</strong></Link>.</p>
                    </CardText>
                </Card>

                <Card className="card">
                    <CardTitle className="card-title" title="At the moment in the application there are in overall:"/>

                    <CardText className="card-text">
                        <GridList cellHeight={120} cols={4} padding={10} className="grid-list">
                            <GridTile style={style.tile} className="tile tile-one">
                                <h4>{this.state.stats.users.total}</h4>
                                <p>registered users</p>
                            </GridTile>

                            <GridTile style={style.tile} className="tile tile-two">
                                <h4>{this.state.stats.notes.total}</h4>
                                <p>notes</p>
                            </GridTile>

                            <GridTile style={style.tile} className="tile tile-three">
                                <h4>{this.state.stats.todos.total}</h4>
                                <p>todo lists</p>
                            </GridTile>

                            <GridTile style={style.tile} className="tile tile-four">
                                <h4>{this.state.stats.events.total}</h4>
                                <p>events</p>
                            </GridTile>
                        </GridList>
                    </CardText>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.data,
        stats: {
            users: {total: state.stats.users.total},
            notes: {total: state.stats.notes.total},
            todos: {total: state.stats.todos.total},
            events: {total: state.stats.events.total}
        }
    }
}

DashboardView = connect(mapStateToProps)(DashboardView)

export default DashboardView
