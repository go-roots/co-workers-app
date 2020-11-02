import React, { Fragment } from 'react'
import Awards from './Awards'
import Comments from './Comments'
import Presentation from './Presentation'
import Recommend from './Recommend'
import Skills from './Skills'


const Profile = () => {
    return (
        <Fragment>
            <Presentation />
            <Skills />
            <Recommend />
            <Awards />
            <Comments />
        </Fragment>
    )
}

export default Profile
