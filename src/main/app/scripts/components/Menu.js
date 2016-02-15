import React from 'react'
import { Divider } from 'material-ui'

/* materials ui icons */
import DashboardIcon from 'material-ui/lib/svg-icons/action/home'
import SampleIcon from 'material-ui/lib/svg-icons/action/dashboard'
import TodoIcon from 'material-ui/lib/svg-icons/av/playlist-add-check'
import NoteIcon from 'material-ui/lib/svg-icons/action/description'
import EventIcon from 'material-ui/lib/svg-icons/notification/event-note'
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
                <MenuItem route="event" text="Events" icon={EventIcon}/>
                <MenuItem route="error" text="Error page" icon={ErrorIcon}/>
                <Divider />
                <MenuItem route="signout" text="Sign out" icon={LogoutIcon}/>
            </div>
            /*
            <div className="menu">
                <MenuItem route="dashboard" text="Dashboard" icon="tachometer"/>
                <MenuItem route="sample" text="Sample page" icon="file-text-o"/>
                <MenuItem route="note" text="Notes" icon="sticky-note"/>
                <MenuItem route="todo" text="Todos" icon="check-square-o"/>
                <MenuItem route="event" text="Events" icon=""/>
                <MenuItem route="error" text="Error page" icon="exclamation-circle"/>
                <Divider />
                <MenuItem route="signout" text="Sign out" icon="sign-out"/>
            </div>
            */
        );
    }
}

export default Menu
