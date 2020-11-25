import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile, fetchProfiles } from '../../store/actions/profiles'
import { fetchRooms } from '../../store/actions/rooms'
import { fetchNotifications } from '../../store/actions/notifications'
import { fetchEvents } from '../../store/actions/events'
import { fetchHelpR } from '../../store/actions/helpR'
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
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loadingUser) {
            dispatch(getCurrentProfile());
            dispatch(fetchProfiles(null, null));
            dispatch(fetchRooms());
            dispatch(fetchNotifications());
            dispatch(fetchEvents());
            dispatch(fetchHelpR());
        }
    }, [loadingUser]);


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
