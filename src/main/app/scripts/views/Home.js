import React from 'react'

import Login from '../components/auth/Login'

class HomeView extends React.Component {
    render() {
        return (
            <div className="state-homepage">
                <Login />
            </div>
        )
    }
}

export default HomeView
