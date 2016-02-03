import React from 'react';
import { Link } from 'react-router';
import { MenuItem as MaterialMenuItem } from 'material-ui';

/* styles */
const style = {
    menuItem: {
        paddingLeft: 56
    }
};

class MenuItem extends React.Component {
    render() {
        return (
            <Link to={this.props.route}>
                <MaterialMenuItem primaryText={this.props.text} leftIcon={<this.props.icon/>} innerDivStyle={style.menuItem}/>
            </Link>
        )
    }
}

export default MenuItem
