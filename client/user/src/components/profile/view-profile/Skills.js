import React, { Fragment } from 'react';
import {FaCheck} from 'react-icons/fa';

const Skills = ({data : profile}) => {
    console.log(profile.profile.skills)
    return (
        <Fragment>
            <div className="col d-flex flex-column justify-content-center align-items-center profile-skill-bio-container">
                <header>
                    <p className="profile-big-text profile-skill-bio-title text-info">Skill Set</p>
                </header>
                <p className="profile-skill-bio-content">
                    {profile.profile.skills.map(skill =>
                    <Fragment>
                        <FaCheck className="fas fa-check"/>&nbsp;{skill}&nbsp;
                    <br />
                    </Fragment>
                    )}
                </p>      
            </div>
        </Fragment>
    )
}

export default Skills
