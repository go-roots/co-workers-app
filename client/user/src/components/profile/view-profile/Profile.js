import React, { Fragment, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {getProfileById} from '../../../store/actions/profiles';
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
