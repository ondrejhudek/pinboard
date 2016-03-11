import React from 'react'

import AddEvent from '../containers/calendar/AddEvent'
import Calendar from '../components/calendar/Calendar'

class CalendarView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
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

export default CalendarView
