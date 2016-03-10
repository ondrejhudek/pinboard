import React from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { FloatingActionButton, Dialog, RaisedButton, FlatButton, TextField, DatePicker, TimePicker } from 'material-ui'
import Colors from 'material-ui/lib/styles/colors'

import AddIcon from 'material-ui/lib/svg-icons/content/add'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import TitleIcon from 'material-ui/lib/svg-icons/editor/text-fields'
import DescriptionIcon from 'material-ui/lib/svg-icons/action/description'
import DateIcon from 'material-ui/lib/svg-icons/action/date-range'
import TimeIcon from 'material-ui/lib/svg-icons/device/access-time'
import LocationIcon from 'material-ui/lib/svg-icons/communication/location-on'

import { fetchAdd } from '../../actions/events'

injectTapEventPlugin()

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

class AddEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch,
            open: false,
            disableSubmit: true,
            eventTitle: '',
            eventDescription: '',
            eventStartDate: '',
            eventStartTime: '',
            eventEndDate: '',
            eventEndTime: '',
            eventLocation: ''
        }

        this.handleOpenDialog = this.handleOpenDialog.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.cleanEventState = this.cleanEventState.bind(this)

        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this)
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this)
    }

    handleOpenDialog() {
        this.setState({open: true})
    }

    handleCloseDialog() {
        this.setState({open: false})
    }

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

    validateForm() {
        //this.setState({disableSubmit: (!this.state.eventTitle || !this.state.eventStartDate || !this.state.eventStartTime || !this.state.eventEndDate || !this.state.eventEndTime)})
        this.setState({disableSubmit: (!this.state.eventTitle)})
    }

    addEvent() {
        const event = {
            title: this.state.eventTitle,
            description: this.state.eventDescription,
            startDate: this.getStartDateTime(this.state.eventStartDate, this.state.eventStartTime),
            endDate: this.getEndDateTime(this.state.eventEndDate, this.state.eventEndTime),
            location: this.state.eventLocation
        }

        this.state.dispatch(fetchAdd(event))
        this.handleCloseDialog()
        this.cleanEventState()
    }

    getStartDateTime(date, time) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
    }

    getEndDateTime(date, time) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
    }

    cleanEventState(){
        this.setState({eventTitle: '', eventDescription: '', eventStartDate: '', eventStartTime: '', eventEndDate: '', eventEndTime: '', eventLocation: '', disableSubmit: true})
    }

    render() {
        const iconColor = Colors.blueGrey600
        const actions = [
            <FlatButton label="Discard" primary={true} onClick={this.handleCloseDialog}/>,
            <FlatButton label="Submit" secondary={true} keyboardFocused={true} disabled={this.state.disableSubmit} onClick={this.addEvent}/>
        ]

        return (
            <div>
                <div className="floatingButton-add">
                    <FloatingActionButton secondary={true} onClick={this.handleOpenDialog}>
                        <AddIcon />
                    </FloatingActionButton>
                </div>

                <Dialog title="Add new event" actions={actions} modal={true} open={this.state.open} className="calendar-addEvent">
                    <div>
                        <TitleIcon color={iconColor} style={style.icon}/>
                        <TextField hintText="Title" underlineStyle={style.underlineStyle} style={style.titleField} value={this.state.eventTitle} onChange={this.handleChangeTitle}/>
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
                                        onChange={this.handleChangeStartDate}/>
                            <div className="clearfix"></div>
                        </div>
                        <div style={style.column}>
                            <TimeIcon color={iconColor} style={style.icon}/>
                            <TimePicker hintText="Start time" underlineStyle={style.underlineStyle} autoOk={true} pedantic={true} value={this.state.eventStartTime}
                                        onChange={this.handleChangeStartTime}/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div>
                        <div style={style.column}>
                            <DateIcon color={iconColor} style={style.icon}/>
                            <DatePicker hintText="End date" underlineStyle={style.underlineStyle} autoOk={true} value={this.state.eventEndDate}
                                        onChange={this.handleChangeEndDate}/>
                            <div className="clearfix"></div>
                        </div>
                        <div style={style.column}>
                            <TimeIcon color={iconColor} style={style.icon}/>
                            <TimePicker hintText="End time" underlineStyle={style.underlineStyle} autoOk={true} pedantic={true} value={this.state.eventEndTime}
                                        onChange={this.handleChangeEndTime}/>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div>
                        <LocationIcon color={iconColor} style={style.icon}/>
                        <TextField hintText="Location" fullWidth={true} style={style.textField} value={this.state.eventLocation} onChange={this.handleChangeLocation}/>
                        <div className="clearfix"></div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

AddEvent = connect()(AddEvent)

export default AddEvent
