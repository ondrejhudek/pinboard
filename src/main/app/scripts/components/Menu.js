import React from 'react'
import { Divider } from 'material-ui'

/* materials ui icons */
import DashboardIcon from 'material-ui/lib/svg-icons/action/home'
import TodoIcon from 'material-ui/lib/svg-icons/av/playlist-add-check'
import NoteIcon from 'material-ui/lib/svg-icons/action/description'
import CalendarIcon from 'material-ui/lib/svg-icons/notification/event-note'
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings'
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app'

import MenuItem from './MenuItem'

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <MenuItem route="dashboard" text="Dashboard" icon={DashboardIcon}/>
                <MenuItem route="note" text="Notes" icon={NoteIcon}/>
                <MenuItem route="todo" text="Todo lists" icon={TodoIcon}/>
                <MenuItem route="calendar" text="Calendar" icon={CalendarIcon}/>
                <Divider />
                <MenuItem route="settings" text="Settings" icon={SettingsIcon}/>
                <Divider />
                <MenuItem route="signout" text="Sign out" icon={LogoutIcon}/>
            </div>
        )
    }
}

export default Menu
