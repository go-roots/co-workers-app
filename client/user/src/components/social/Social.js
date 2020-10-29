import React, { Fragment } from 'react'
import Friends from './Friends'
import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'


const Social = () => {
    return (
        <Fragment>
            <Profile />
            <Notifications />
            <Messages />
            <Friends />
        </Fragment>
    )
}

export default Social
