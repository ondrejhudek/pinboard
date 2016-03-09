import React from 'react'

import AddEvent from '../containers/calendar/AddEvent'

class CalendarView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="state-calendar">
                <h2>Calendar</h2>

                <AddEvent />
            </div>
        )
    }
}

export default CalendarView
