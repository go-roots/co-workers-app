import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../store/actions/profiles';
import Friends from './Friends'
import Messages from './Messages'
import Notifications from './Notifications'
import Profile from './Profile'


const Social = () => {

    const profile = useSelector(state => state.profiles.myProfile)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch])

    return (
        <Fragment>
            <section className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-7 col-xl-7" style={{ padding: 10 }}>
                            <div className="card-group">
                                <Profile />
                                <Notifications />
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-5">
                            <div className="container">
                                <div className="row vh-container">
                                    <Messages />
                                    <Friends />
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
