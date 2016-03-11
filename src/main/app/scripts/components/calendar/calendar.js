import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import EventDialog from './EventDialog'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
)

const style = {
    calendar: {
        height: 600
    }
}

//let Calendar = ({ events, isFetching }) => {
//    const onSelectEvent = (e) => {
//        console.log(e)
//
//        //this.refs.dialog.getWrappedInstance().open()
//    }
//
//    return (
//        <div>
//            <div className="state-fetching" id={isFetching ? 'show' : ''}>
//                <CircularProgress />
//            </div>
//
//            <div className={isFetching ? 'hide' : ''}>
//                <BigCalendar events={events} onSelectEvent={onSelectEvent}
//                             startAccessor='startDate' endAccessor='endDate' style={style.calendar}/>
//            </div>
//        </div>
//    )
//}
//
//Calendar.propTypes = {
//    events: PropTypes.arrayOf(PropTypes.shape({
//        id: PropTypes.number.isRequired,
//        _id: PropTypes.string.isRequired,
//        title: PropTypes.string.isRequired,
//        description: PropTypes.string.isRequired,
//        startDate: PropTypes.object.isRequired,
//        endDate: PropTypes.object.isRequired,
//        location: PropTypes.string.isRequired
//    }).isRequired).isRequired,
//    isFetching: PropTypes.bool.isRequired
//}
//
//const mapStateToProps = (state) => {
//    return {
//        events: state.events.items,
//        isFetching: state.events.isFetching
//    }
//}
//
//Calendar = connect(mapStateToProps)(Calendar)
//
//export default Calendar

class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: props.events,
            isFetching: props.isFetching
        }

        this.onSelectEvent = this.onSelectEvent.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({events: nextProps.events, isFetching: nextProps.isFetching})
    }

    onSelectEvent(e) {
        this.refs.dialog.getWrappedInstance().open(e)
    }

    render() {
        return (
            <div>
                <div className="state-fetching" id={this.state.isFetching ? 'show' : ''}>
                    <CircularProgress />
                </div>

                <div className={this.state.isFetching ? 'hide' : ''}>
                    <BigCalendar events={this.state.events} onSelectEvent={this.onSelectEvent}
                                 startAccessor='startDate' endAccessor='endDate' style={style.calendar}/>
                </div>

                <EventDialog ref="dialog"/>
            </div>
        )
    }
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
