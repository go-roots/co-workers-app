import React from 'react'

const Awards = () => {
    return (
        <div className="row" style="margin-bottom: 15px;">
            <div className="col d-flex flex-column profile-skill-bio-container">
                <header>
                    <p className="text-center profile-big-text profile-skill-bio-title text-info">Awards &amp; Achievements</p>
                </header>
                <div className="d-flex flex-column justify-content-center align-items-baseline"></div>
                <ul className="list-group align-self-center awards-container">
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img src={""} width="40" height="40" /></button>
                        <p>CoWorkers IoT championship winner</p>
                        <p className="award-date">(25 July 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={""} /></button>
                        <p>Events: has organized 3 events</p>
                        <p className="award-date">(11 April 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={""} /></button>
                        <p>Hero: Helped 10 different persons</p>
                        <p className="award-date">(22th March 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={""} /></button>
                        <p>Root: Has worked 10 hours in Go-Roots</p>
                        <p className="award-date">(22th March 2020)</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Awards
