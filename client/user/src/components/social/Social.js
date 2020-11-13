import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile, fetchProfiles } from '../../store/actions/profiles'
import Friends from './Friends'
import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'
import Spinner from '../UI/Spinner'


const Social = () => {

    const profile = useSelector(state => state.profiles.myProfile);
    const profiles = useSelector(state => state.profiles.profiles);
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchProfile = useCallback(async () => {
        await dispatch(getCurrentProfile()); //dispatch needs to be awaited for consistency
        await dispatch(fetchProfiles(null, null));
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
    }, [dispatch, fetchProfile]);

    if (loading) {
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
