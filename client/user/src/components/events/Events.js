import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';
import ph from'../../assets/img/pumpkin-halloween.svg';
import he from 'assets/img/halloween-event.svg';

const Events = () =>{
    return(
        /*{ 
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
}*/
            <section className="container main">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1 vh-container-small">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between align-items-start">
                                <p id="halloween-party-header" style={{ fontFamily: 'Alatsi, sans-serif' }} >Halloween party</p><img id="halloween-pumpkin" src={pumpkin} alt="pic" /></div>
                            <p className="text-center" id="halloween-event-text">We welcome all of you ! If you're interested in that event, join us the 30th October 8pm-2am</p>
                        </li>
                        <li className="list-group-item">
                            <p className="text-right" id="cinema-event-header">Cinema night</p>
                            <p className="text-center">You are a cinema fan ? Come to the Cinema night for an entry fee of 2€, and enjoy a nice movie + appetizers &amp; drinks</p>
                        </li>
                        <li className="list-group-item">
                            <p className="text-center" id="chinese-className-event-header">Chinese className</p>
                            <p className="text-center">If you're interested in Chinese or Chinese culture, we have free chinese className every Friday afternoon from 4 to 5.30pm</p>
                        </li>
                        <li className="list-group-item">
                            <p className="text-center" id="chinese-className-event-header-1">Speed Chess</p>
                            <p className="text-center">Speed chess competition to chill out after a hard work day, 3rd November 6pm !</p>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 col-lg-8 col-xl-7 align-self-center responsive-margin"><img className="img-fluid" src={halloweenEvent} alt="pic" /></div>
            </div>
        </section>
        
    )
}
       
    

import React from 'react'

const Events = () => {
    return (
        <div>
            Events
        </div>
    )
}

export default Events
