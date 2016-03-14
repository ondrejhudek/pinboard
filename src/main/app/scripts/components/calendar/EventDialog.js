import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Dialog, FlatButton, TextField, DatePicker, TimePicker, Snackbar  } from 'material-ui'
import Colors from 'material-ui/lib/styles/colors'

import EventIcon from 'material-ui/lib/svg-icons/action/event'
import TitleIcon from 'material-ui/lib/svg-icons/editor/text-fields'
import DescriptionIcon from 'material-ui/lib/svg-icons/action/description'
import DateIcon from 'material-ui/lib/svg-icons/action/date-range'
import TimeIcon from 'material-ui/lib/svg-icons/device/access-time'
import LocationIcon from 'material-ui/lib/svg-icons/communication/location-on'

import { fetchAdd, updateEvent, removeEvent } from '../../actions/events'
import { getDatetime, getFormatedDate } from '../../components/Util'

const style = {
    column: {
        display: 'inline-block',
        width: '50%'
    },
    icon: {
        float: 'left',
        padding: 14
    },
    titleField: {
        display: 'block',
        width: 'auto',
        marginLeft: 52,
        marginRight: 30,
        fontWeight: 700,
        fontSize: 18
    },
    textField: {
        display: 'block',
        width: 'auto',
        marginLeft: 52,
        marginRight: 30
    },
    fieldHint: {
        top: 12,
        bottom: 'auto'
    },
    underlineStyle: {
        borderColor: Colors.red200
    }
}

class EventDialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch,
            open: false,
            errorOpen: false,
            mode: 'CREATE',
            disableSubmit: true,
            eventId: '',
            eventObjectId: '',
            eventTitle: '',
            eventDescription: '',
            eventStart: '',
            eventStartDate: '',
            eventStartTime: '',
            eventEnd: '',
            eventEndDate: '',
            eventEndTime: '',
            eventLocation: ''
        }

        /* handle open/close dialog/error snackbar */
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.handleOpenError = this.handleOpenError.bind(this)
        this.handleCloseError = this.handleCloseError.bind(this)

        /* handle textfields onChange event */
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this)
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this)

        /* form manipulation */
        this.cleanEventState = this.cleanEventState.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.updateEvent = this.updateEvent.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
        this.removeEvent = this.removeEvent.bind(this)
    }

    /* handle open/close dialog */
    open(e) {
        if (typeof e !== 'undefined') {
            this.setState({
                mode: 'READ',
                eventId: e.id,
                eventObjectId: e._id,
                eventTitle: e.title,
                eventDescription: e.description,
                eventStart: getFormatedDate(e.startDate),
                eventStartDate: e.startDate,
                eventStartTime: e.startDate,
                eventEnd: getFormatedDate(e.endDate),
                eventEndDate: e.endDate,
                eventEndTime: e.endDate,
                eventLocation: e.location
            })
        }

        this.setState({open: true}, () => {
            if (['CREATE', 'UPDATE', 'READ'].indexOf(this.state.mode) === -1) this.handleOpenError()
        })
    }

    close() {
        this.setState({open: false})
    }

    handleOpenError() {
        this.setState({errorOpen: true})
    }

    handleCloseError() {
        this.setState({errorOpen: false})
    }

    /* handle textfields onChange event */
    handleChangeTitle(e) {
        this.setState({eventTitle: e.target.value}, this.validateForm)
    }

    handleChangeDescription(e) {
        this.setState({eventDescription: e.target.value}, this.validateForm)
    }

    handleChangeStartDate(e, date) {
        this.setState({eventStartDate: date}, this.validateForm)
    }

    handleChangeStartTime(e, time) {
        this.setState({eventStartTime: time}, this.validateForm)
    }

    handleChangeEndDate(e, date) {
        this.setState({eventEndDate: date}, this.validateForm)
    }

    handleChangeEndTime(e, time) {
        this.setState({eventEndTime: time}, this.validateForm)
    }

    handleChangeLocation(e) {
        this.setState({eventLocation: e.target.value}, this.validateForm)
    }

    /* form manipulation */
    cleanEventState() {
        this.setState({mode: 'READ', eventTitle: '', eventDescription: '', eventStartDate: '', eventStartTime: '', eventEndDate: '', eventEndTime: '', eventLocation: '', disableSubmit: true})
    }

    validateForm() {
        //this.setState({disableSubmit: (!this.state.eventTitle || !this.state.eventStartDate || !this.state.eventStartTime || !this.state.eventEndDate || !this.state.eventEndTime)})
        this.setState({disableSubmit: (!this.state.eventTitle)})
    }

    addEvent() {
        const event = {
            title: this.state.eventTitle,
            description: this.state.eventDescription,
            startDate: getDatetime(this.state.eventStartDate, this.state.eventStartTime),
            endDate: getDatetime(this.state.eventEndDate, this.state.eventEndTime),
            location: this.state.eventLocation
        }

        this.state.dispatch(fetchAdd(event))
        this.close()
        this.cleanEventState()
    }

    updateEvent() {
        this.setState({mode: 'UPDATE'})
    }

    saveEvent() {
        const event = {
            id: this.state.eventId,
            objectId: this.state.eventObjectId,
            title: this.state.eventTitle,
            description: this.state.eventDescription,
            startDate: getDatetime(this.state.eventStartDate, this.state.eventStartTime),
            endDate: getDatetime(this.state.eventEndDate, this.state.eventEndTime),
            location: this.state.eventLocation
        }

        this.state.dispatch(updateEvent(event))
        this.close()
        this.cleanEventState()
    }

    removeEvent() {
        const event = {
            id: this.state.eventId,
            objectId: this.state.eventObjectId
        }

        this.state.dispatch(removeEvent(event))
        this.close()
        this.cleanEventState()
    }

    render() {
        const iconColor = Colors.blueGrey600
        const actionsCreate = [
            <FlatButton label="Discard" primary={true} onClick={this.close}/>,
            <FlatButton label="Submit" secondary={true} keyboardFocused={true} disabled={this.state.disableSubmit} onClick={this.addEvent}/>
        ]
        const actionsUpdate = [
            <FlatButton label="Cancel" onClick={this.close}/>,
            <FlatButton label="Save" primary={true} onClick={this.saveEvent}/>
        ]
        const actionsRead = [
            <FlatButton label="Close" onClick={this.close}/>,
            <FlatButton label="Remove" primary={true} onClick={this.removeEvent}/>,
            <FlatButton label="Update" secondary={true} onClick={this.updateEvent}/>
        ]

        let startDateProps = {}
        let startTimeProps = {}
        let endDateProps = {}
        let endTimeProps = {}
        if (this.state.mode === 'UPDATE') {
            startDateProps.defaultDate = this.state.eventStartDate
            startTimeProps.defaultTime = this.state.eventStartTime
            endDateProps.defaultDate = this.state.eventEndDate
            endTimeProps.defaultTime = this.state.eventEndTime
        }

        /* render html */
        let content = ''
        const error = (
            <Snackbar open={this.state.errorOpen} message="Sorry, but something went wrong. Please try it again or contact the administrator." autoHideDuration={6000}
                      onRequestClose={this.handleCloseError}/>
        )

        if (this.state.mode === 'CREATE' || this.state.mode === 'UPDATE') {
            content = (
                <Dialog title="Add new event" actions={this.state.mode === 'CREATE' ? actionsCreate : actionsUpdate} modal={true} open={this.state.open}>
                    <div>
                        <div>
                            <TitleIcon color={iconColor} style={style.icon}/>
                            <TextField hintText="Title" underlineStyle={style.underlineStyle} style={style.titleField} value={this.state.eventTitle}
                                       onChange={this.handleChangeTitle}/>
                            <div className="clearfix"></div>
                        </div>

                        <div>
                            <DescriptionIcon color={iconColor} style={style.icon}/>
                            <TextField hintText="Description" hintStyle={style.fieldHint} fullWidth={true} multiLine={true} rows={2} style={style.textField}
                                       value={this.state.eventDescription} onChange={this.handleChangeDescription}/>
                            <div className="clearfix"></div>
                        </div>

                        <div>
                            <div style={style.column}>
                                <DateIcon color={iconColor} style={style.icon}/>
                                <DatePicker hintText="Start date" underlineStyle={style.underlineStyle} autoOk={true} value={this.state.eventStartDate}
                                    {...startDateProps} firstDayOfWeek={1} onChange={this.handleChangeStartDate}/>
                                <div className="clearfix"></div>
                            </div>
                            <div style={style.column}>
                                <TimeIcon color={iconColor} style={style.icon}/>
                                <TimePicker hintText="Start time" underlineStyle={style.underlineStyle} autoOk={true} pedantic={true} value={this.state.eventStartTime}
                                    {...startTimeProps} onChange={this.handleChangeStartTime}/>
                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div>
                            <div style={style.column}>
                                <DateIcon color={iconColor} style={style.icon}/>
                                <DatePicker hintText="End date" underlineStyle={style.underlineStyle} autoOk={true} value={this.state.eventEndDate}
                                    {...endDateProps} firstDayOfWeek={1} onChange={this.handleChangeEndDate}/>
                                <div className="clearfix"></div>
                            </div>
                            <div style={style.column}>
                                <TimeIcon color={iconColor} style={style.icon}/>
                                <TimePicker hintText="End time" underlineStyle={style.underlineStyle} autoOk={true} pedantic={true} value={this.state.eventEndTime}
                                    {...endTimeProps} onChange={this.handleChangeEndTime}/>
                                <div className="clearfix"></div>
                            </div>
                        </div>

                        <div>
                            <LocationIcon color={iconColor} style={style.icon}/>
                            <TextField hintText="Location" fullWidth={true} style={style.textField} value={this.state.eventLocation} onChange={this.handleChangeLocation}/>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </Dialog>
            )
        } else if (this.state.mode === 'READ') {
            content = (
                <Dialog title="Event detail" actions={actionsRead} modal={true} open={this.state.open}>
                    <h4>{this.state.eventTitle}</h4>
                    <p>What? {this.state.eventDescription}</p>
                    <p>Starts at: {this.state.eventStart}</p>
                    <p>Ends at: {this.state.eventEnd}</p>
                    <p>Where? {this.state.eventLocation}</p>
                </Dialog>
            )
        }

        return (
            <div>
                {content}
                {error}
            </div>
        )
    }
}

EventDialog = connect(state => ({state}), null, null, {withRef: true})(EventDialog)

export default EventDialog
