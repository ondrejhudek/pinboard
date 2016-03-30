import React from 'react'
import { connect } from 'react-redux'

import AddEvent from '../containers/calendar/AddEvent'
import Calendar from '../components/calendar/Calendar'

import { fetchEvents } from '../actions/events'
let fetched = false

class CalendarView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch
        }
    }

    componentWillMount() {
        if (!fetched) {
            this.state.dispatch(fetchEvents())
            fetched = true
        }
    }

    render() {
        return (
            <div className="view-calendar">
                <h2>Calendar</h2>

                <AddEvent />
                <Calendar />
            </div>
        )
    }
}

CalendarView = connect()(CalendarView)

export default CalendarView
