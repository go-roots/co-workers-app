import React, { Fragment } from 'react';
import {FaCheck} from 'react-icons/fa';

const Skills = () => {
    return (
        <Fragment>
            <div class="col d-flex flex-column justify-content-center align-items-center profile-skill-bio-container">
                <header>
                    <p class="profile-big-text profile-skill-bio-title text-info">Skill Set</p>
                </header>
                <p class="profile-skill-bio-content">
                    <FaCheck class="fas fa-check"/>&nbsp;Manufacturing of electrical devices&nbsp;
                    <br />
                    <FaCheck class="fas fa-check"/>&nbsp;IoT-raspberryPi&nbsp;
                </p>      
            </div>
        </Fragment>
    )
}

export default Skills
