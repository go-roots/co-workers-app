import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import {GrTrophy} from 'react-icons/gr';
import {ImTrophy} from 'react-icons/im';
import {FaMedal} from 'react-icons/fa'

const Presentation = ({data : profile}) => {
    return (
        <Fragment>
        <ReactTooltip place="top" type="dark" effect="solid" />
        <div className="row" style={{marginBottom: "15px"}}>
            <div className="col d-flex flex-column justify-content-center align-items-center profile-main-container" style={{background: "#00a3ff"}}>
                <div id="round-profile-image" style={{background:`url(${profile.profile.photo}) center / cover no-repeat`}}></div>
                <div className="d-flex flex-column align-items-center" id="profile-main-content">
                    <div className="d-flex flex-row justify-content-center align-items-center" id="trophys-container">
                        <GrTrophy className="icon-trophy"  style={{fontSize: "40px", color: "rgb(20,255,0)", margin:"5px"}} data-tip="CoWorkers IoT championship winner"/>
                        <ImTrophy className="la la-trophy" style={{fontSize: "50px",color: "rgb(255,15,0)"}} data-tip="Events: has organized 3 events" />
                        <FaMedal className="fas fa-medal" style={{fontSize: "40px", color: "rgb(233,254,0)"}} data-tip="Hero: helped 10 different persons"/>
                    </div>
                    <p className="profile-big-text"
                        style={{color:"white"}}>{profile.firstName}</p>
                    <p className="text-center" id="profile-content-position">{profile.profile.position} at {profile.profile.company}</p>
                    <p className="text-center profile-skill-bio-content">{profile.profile.bio}</p>
                </div>
            </div>
        </div>
        </Fragment>
        
    )
}

export default Presentation
