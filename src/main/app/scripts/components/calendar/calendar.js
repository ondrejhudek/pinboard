import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

//BigCalendar.momentLocalizer(moment)

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
)

const style = {
    calendar: {
        height: 600
    }
}

let Calendar = ({ events, isFetching }) => {
    const onSelectEvent = (e) => {
        console.log(e)
    }

    return (
        <div>
            <div className="state-fetching" id={isFetching ? 'show' : ''}>
                <CircularProgress />
            </div>

            <div className={isFetching ? 'hide' : ''}>
                <BigCalendar events={events} onSelectEvent={onSelectEvent}
                             startAccessor='startDate' endAccessor='endDate' style={style.calendar}/>
            </div>
        </div>
    )
}

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        startDate: PropTypes.object.isRequired,
        endDate: PropTypes.object.isRequired,
        location: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        events: state.events.items,
        isFetching: state.events.isFetching
    }
}

Calendar = connect(mapStateToProps)(Calendar)

export default Calendar
