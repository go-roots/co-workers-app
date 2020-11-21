import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile, fetchProfiles } from '../../store/actions/profiles'
import Friends from './Friends'
import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'
import Spinner from '../UI/Spinner'


const Social = () => {

    const { myProfile: profile, profiles, loading: { myProfile: loadingMyProfile, profiles: loadingProfiles } } = useSelector(state => state.profiles);
    const { user, loading: loadingUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loadingUser) {
            dispatch(getCurrentProfile());
            dispatch(fetchProfiles(null, null));
        }
    }, [loadingUser]);


    if (loadingMyProfile || loadingProfiles || loadingUser) {
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
                                <Notifications />
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-5">
                            <div className="container">
                                <div className="row vh-container">
                                    <Messages data={{ profiles, user }} />
                                    <Friends data={{ profiles, user }} />
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
