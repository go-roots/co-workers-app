import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Awards from './Awards';
import Comments from './Comments';
import Presentation from './Presentation';
import Recommend from './Recommend';
import Skills from './Skills';


const Profile = () => {

    const profile = useSelector(state => state.profiles.profile);
    const users = useSelector(state => state.profiles.profiles);


    if (!profile?.profile) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <section className="main container">
                <Presentation data={profile} />
                <div className="row" style={{ marginBottom: "15px" }}>
                    <Skills data={profile} />
                    <Recommend data={profile} />
                </div>
                <Awards awards={profile.profile.awards} />
                <Comments comments={profile.profile.comments} users={users} />
            </section>
        </Fragment>
    )
}

export default Profile
