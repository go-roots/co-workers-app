import React, { Fragment } from 'react'
import Bio from './Bio'
import Infos from './Infos'
import Picture from './Picture'

const Profile = () => {
    return (
        <Fragment>
            <Picture />
            <Bio />
            <Infos />
        </Fragment>
    )
}

export default Profile
