import React, { Fragment } from 'react';
import {FaCheck} from 'react-icons/fa';

const Skills = () => {
    return (
        <Fragment>
            <div className="col d-flex flex-column justify-content-center align-items-center profile-skill-bio-container">
                <header>
                    <p className="profile-big-text profile-skill-bio-title text-info">Skill Set</p>
                </header>
                <p className="profile-skill-bio-content">
                    <FaCheck className="fas fa-check"/>&nbsp;Manufacturing of electrical devices&nbsp;
                    <br />
                    <FaCheck className="fas fa-check"/>&nbsp;IoT-raspberryPi&nbsp;
                </p>      
            </div>
        </Fragment>
    )
}

export default Skills
