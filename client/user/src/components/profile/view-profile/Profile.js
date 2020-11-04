import React, { Fragment } from 'react'
import Awards from './Awards'
import Comments from './Comments'
import Presentation from './Presentation'
import Recommend from './Recommend'
import Skills from './Skills'


const Profile = () => {
    return (
        <Fragment>
            <section className="main container">
                <Presentation />
                <div className="row" style={{marginBottom: "15px"}}>
                    <Skills />
                    <Recommend />
                </div>
                
                <Awards />
                <Comments />
                </section>
        </Fragment>
    )
}

export default Profile
