import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import {GrTrophy} from 'react-icons/gr';
import {ImTrophy} from 'react-icons/im';
import {FaMedal} from 'react-icons/fa'

const Presentation = () => {
    return (
        <Fragment>
        <ReactTooltip place="top" type="dark" effect="solid" />
        <div className="row" style={{marginBottom: "15px"}}>
            <div className="col d-flex flex-column justify-content-center align-items-center profile-main-container" style={{background: "#00a3ff"}}>
                <div id="round-profile-image"></div>
                <div className="d-flex flex-column align-items-center" id="profile-main-content">
                    <div className="d-flex flex-row justify-content-center align-items-center" id="trophys-container">
                        <GrTrophy className="icon-trophy"  style={{fontSize: "40px", color: "rgb(20,255,0)", margin:"5px"}} data-tip="CoWorkers IoT championship winner"/>
                        <ImTrophy className="la la-trophy" style={{fontSize: "50px",color: "rgb(255,15,0)"}} data-tip="Events: has organized 3 events" />
                        <FaMedal className="fas fa-medal" style={{fontSize: "40px", color: "rgb(233,254,0)"}} data-tip="Hero: helped 10 different persons"/>
                    </div>
                    <p className="profile-big-text"
                        style={{color:"white"}}>Bob</p>
                    <p className="text-center" id="profile-content-position">Electrical engineer at Airbus, Toulouse</p>
                    <p className="text-center profile-skill-bio-content">I am an electrical engineer with 20+ years experience. Due to to current situation (Covid), I have to now work part-time. As I have more free-time I want to find a place where I can exchange with workers from different fields and maybe
                        teach/learn something new, start new thrilling projects.</p>
                </div>
            </div>
        </div>
        </Fragment>
        
    )
}

export default Presentation
