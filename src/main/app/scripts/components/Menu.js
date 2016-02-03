import React from 'react';
import { Divider } from 'material-ui';

/* materials ui icons */
import DashboardIcon from 'material-ui/lib/svg-icons/action/home'
import SampleIcon from 'material-ui/lib/svg-icons/action/dashboard'
import ErrorIcon from 'material-ui/lib/svg-icons/alert/error-outline'
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app'

import MenuItem from './MenuItem';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <MenuItem route="dashboard" text="Dashboard" icon={DashboardIcon}/>
                <MenuItem route="sample" text="Sample page" icon={SampleIcon}/>
                <MenuItem route="error" text="Error page" icon={ErrorIcon}/>
                <Divider />
                <MenuItem route="signout" text="Sign out" icon={LogoutIcon}/>
            </div>
        );
    }
}

export default Menu
