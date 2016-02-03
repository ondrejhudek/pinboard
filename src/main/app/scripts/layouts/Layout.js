import React, { PropTypes } from 'react'

import Sidebar from '../components/Siderbar'

function Layout({ children }) {
    let appendSidebar = true;
    const noSidebarViews = ['signin', 'signout', 'lost-password', '404'];

    let path = children.props.location.pathname;
    path = (path.substr(0, 1) === '/') ? path = path.substr(1, path.length) : path;

    noSidebarViews.forEach(function (item) {
        if (item === path) {
            appendSidebar = false;
        }
    });

    return (
        <div>
            { appendSidebar ? <Sidebar/> : null }
            <div className={appendSidebar ? "container" : ""}>
                { children }
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.element
};

export default Layout
