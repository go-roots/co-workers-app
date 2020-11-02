import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';
import a1 from "../../assets/img/award1.svg";
import a2 from "assets/img/award2.svg";
import a3 from "assets/img/award3.svg";
import a4 from "assets/img/award4.svg";
import npp from "assets/img/notif-profile-picture.jpg";

const p = () =>{
    return(
        /*
        <Fragment>
            <nav className='navbar navbar-light navbar-expand-md'>
                <div className = 'container-fluid'>
                    <a className='navbar-brand' href = '#'>
                        <img alt='logo' src={logoMedium}/>
                    </a>
                    <button 
                        data-toggle='collapse' 
                        className='navbar-toggler'
                        data-target='#navcol-1' >
                        <span className='sr-only'> Toggle navigation</span>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                <div className='collapse navbar-collapse' id='navcol-1'>
                <ul className='nav navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link active' to='/dashboard'>My Dashboard</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/consumption'>My Consumption</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/events'>Events</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/cw-points'>My CW Points</Link>
                    </li>
                </ul>
                <ul className='nav navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link className='btn btn-outline-success nav-login' to='/login'>LOGIN</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='btn btn-outline-success nav-login' to='/register'>LOGIN</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
*/
            <section className="main container">
            <div className="row" style="margin-bottom: 15px;">
                <div className="col d-flex flex-column justify-content-center align-items-center profile-main-container" style="background: #00a3ff;">
                    <div id="round-profile-image"></div>
                    <div className="d-flex flex-column align-items-center" id="profile-main-content">
                        <div className="d-flex flex-row justify-content-center align-items-center" id="trophys-container"><i className="icon-trophy" data-toggle="tooltip" data-bs-tooltip="" style="font-size: 40px;color: rgb(20,255,0);" title="CoWorkers IoT championship winner"></i><i className="la la-trophy" data-toggle="tooltip" data-bs-tooltip="" style="font-size: 50px;color: rgb(255,15,0);"
                            title="Events: has organized 3 events"></i><i className="fas fa-medal" data-toggle="tooltip" data-bs-tooltip="" style="font-size: 40px;color: rgb(233,254,0);" title="Hero: helped 10 different persons"></i></div>
                        <p className="profile-big-text"
                        style="color:white">Bob</p>
                        <p className="text-center" id="profile-content-position">Electrical engineer at Airbus, Toulouse</p>
                        <p className="text-center profile-skill-bio-content">I am an electrical engineer with 20+ years experience. Due to to current situation (Covid), I have to now work part-time. As I have more free-time I want to find a place where I can exchange with workers from different fields and maybe
                        teach/learn something new, start new thrilling projects.</p>
                    </div>
                </div>
            </div>
            <div className="row" style="margin-bottom: 15px;">
            <div className="col d-flex flex-column justify-content-center align-items-center profile-skill-bio-container">
                <header>
                    <p className="profile-big-text profile-skill-bio-title text-info">Skill Set</p>
                </header>
                <p className="profile-skill-bio-content"><i className="fas fa-check"></i>&nbsp;manufacturing of electrical devices&nbsp;<i className="fas fa-check"></i>&nbsp;IoT-raspberryPi<br/>&nbsp;</p>
            </div>
            <div className="col">
                <ul className="list-group">
                    <li className="list-group-item social-link"><span>Recommend Bob on&nbsp;<a href="#">Linkedin</a></span></li>
                    <li className="list-group-item social-link"><span>Follow him on&nbsp;<a href="#">Facebook</a>,&nbsp;<a href="#">Instagram</a>,&nbsp;</span><a href="#">Twitter</a></li>
                    <li className="list-group-item social-link"><span>Check out his&nbsp;<a href="#">Github</a>&nbsp;and&nbsp;<a href="#">Youtube</a>&nbsp;accounts</span></li>
                </ul>
            </div>
        </div>
        <div className="row" style="margin-bottom: 15px;">
            <div className="col d-flex flex-column profile-skill-bio-container">
                <header>
                    <p className="text-center profile-big-text profile-skill-bio-title text-info">Awards &amp; Achievements</p>
                </header>
                <div className="d-flex flex-column justify-content-center align-items-baseline"></div>
                <ul className="list-group align-self-center awards-container">
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img src={a1} width="40" height="40"/></button>
                        <p>CoWorkers IoT championship winner</p>
                        <p className="award-date">(25 July 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={a2}/></button>
                        <p>Events: has organized 3 events</p>
                        <p className="award-date">(11 April 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={a3}/></button>
                        <p>Hero: Helped 10 different persons</p>
                        <p className="award-date">(22th March 2020)</p>
                    </li>
                    <li className="list-group-item d-flex flex-row align-items-baseline awards-item"><button className="btn" type="button"><img width="40" height="40" src={a4}/></button>
                        <p>Root: Has worked 10 hours in Go-Roots</p>
                        <p className="award-date">(22th March 2020)</p>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <div className="col responsive-margin">
                <div className="d-flex flex-column justify-content-start" id="profile-user-recommendations">
                    <div className="profile-recommendation-element">
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={npp}/>
                            <p>Jorgo - 21/09/2020</p>
                        </div>
                        <p>Bob helped me a lot on a super complicated topic, he is a true professional</p>
                    </div>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={npp}/>
                            <p>Ilya - 30/07/2020</p>
                        </div>
                        <p>Bob saved me a lot of time by helping fixing my wind direction sensor</p>
                    </div>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={npp}/>
                            <p>Shradda - 01/03/2020</p>
                        </div>
                        <p>A great technician, Bob gave me precious advise !</p>
                    </div>
                </div>
            </div>
        </div>
        </section>
    //</Fragment>
    )
}
       
    

export default p