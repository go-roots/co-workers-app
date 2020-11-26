import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Friends from './Friends'
import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'
import Spinner from '../UI/Spinner'


const Social = () => {

    const { myProfile: profile, profiles, profile: selectedProfile, loading: { myProfile: loadingMyProfile, profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user, loading: loadingUser } = useSelector(state => state.auth);
    const { notifications, loading: notificationsLoading } = useSelector(state => state.notifications);
    const { events, loading: eventsLoading } = useSelector(state => state.events);
    const { helpR, loading: loadingHelpR } = useSelector(state => state.helpR)
    const { rooms, loading: loadingRooms } = useSelector(state => state.rooms);


    if (loadingMyProfile
        || loadingProfiles || loadingUser || notificationsLoading
        || eventsLoading || loadingRooms || loadingHelpR
    ) {
        return <Spinner />
    }

    return (
        <Fragment>
            <section className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-7 col-xl-7" style={{ padding: 10 }}>
                            <div className="card-group">
                                <Profile data={{ profile, user }} />
                                <Notifications data={{ notifications, profiles, profile, events, user, helpR }} />
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-5">
                            <div className="container">
                                <div className="row vh-container">
                                    <Messages data={{ profiles, user }} />
                                    <Friends data={{ profiles, user, rooms, selectedProfile }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Social
