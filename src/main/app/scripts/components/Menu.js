import React from 'react'
import { Divider } from 'material-ui'

/* materials ui icons */
import DashboardIcon from 'material-ui/lib/svg-icons/action/home'
import SampleIcon from 'material-ui/lib/svg-icons/action/dashboard'
import TodoIcon from 'material-ui/lib/svg-icons/av/playlist-add-check'
import NoteIcon from 'material-ui/lib/svg-icons/action/description'
import CalendarIcon from 'material-ui/lib/svg-icons/notification/event-note'
import ErrorIcon from 'material-ui/lib/svg-icons/alert/error-outline'
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app'

import MenuItem from './MenuItem'

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <MenuItem route="dashboard" text="Dashboard" icon={DashboardIcon}/>
                <MenuItem route="sample" text="Sample page" icon={SampleIcon}/>
                <MenuItem route="note" text="Notes" icon={NoteIcon}/>
                <MenuItem route="todo" text="Todos" icon={TodoIcon}/>
                <MenuItem route="calendar" text="Calendar" icon={CalendarIcon}/>
                <MenuItem route="error" text="Error page" icon={ErrorIcon}/>
                <Divider />
                <MenuItem route="signout" text="Sign out" icon={LogoutIcon}/>
            </div>
        );
    }
}

export default Menu
