import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { FloatingActionButton } from 'material-ui'
import AddIcon from 'material-ui/lib/svg-icons/content/add'

import EventDialog from '../../components/calendar/EventDialog'

injectTapEventPlugin()

class AddEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleOpenDialog = this.handleOpenDialog.bind(this)
    }

    handleOpenDialog() {
        this.refs.dialog.getWrappedInstance().open()
    }


    render() {
        return (
            <div>
                <div className="floatingButton-add">
                    <FloatingActionButton secondary={true} onClick={this.handleOpenDialog}>
                        <AddIcon />
                    </FloatingActionButton>
                </div>

                <EventDialog ref="dialog"/>
            </div>
        )
    }
}

export default AddEvent
