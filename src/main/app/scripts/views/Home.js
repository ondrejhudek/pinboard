import React from 'react'

import Login from '../components/auth/Login'

class HomeView extends React.Component {
    render() {
        return (
            <div className="view-homepage">
                <Login />
            </div>
        )
    }
}

export default HomeView
