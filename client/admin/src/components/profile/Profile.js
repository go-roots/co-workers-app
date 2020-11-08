import React from 'react'
import Bio from './Bio'
import Infos from './Infos'
import Picture from './Picture'

const Profile = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">John Doe</h3>
            <div className="row mb-3">
                <div className="col-lg-4">
                    <Picture />
                    <Bio />
                </div>
                <Infos />
            </div>
        </div>
    )
}

export default Profile
