import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';
import sm from'../../assets/img/set-medals.svg';
import sb from '../../assets/img/shooping-bag.png';
import ss from '../../assets/img/steel-straw.jpg';
import smug from '../../assets/img/steel-mug.png';
import coffee from '../../assets/img/coffee.jpg';

const cw = props =>{
    return(
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
            <section className='container main'>
                <div className='row'>
                    <div className='col-sm-12 col-md-5 col-lg-5 col-xl-5'>
                        <div className='text-center' id='medal-points-container'>
                            <p>You earned 1718 CW Points !</p><img class="img-fluid" src={sm}/></div>
                        </div>
                        <div className='col responsive-margin'>
                        <ul className='list-group'>
                            <li className='list-group-item'><span>200 cwp : Helped in organizing the halloween party</span></li>
                            <li className='list-group-item'><span>100 cwp : Helped Franck on #Front-end-developper</span></li>
                            <li className='list-group-item'><span>100&nbsp;cwp : helped Jorgo on #MachineLearning</span></li>
                            <li className='list-group-item'><span>25 cwp : Recommended Daiqiao on #Bizagi</span></li>
                            <li className='list-group-item'><span>200 cwp : 3 months green behaviour streak&nbsp; !</span></li>
                            <li className='list-group-item'><button className='btn btn-primary btn-block text-white arrow-button' type='button'><i className="icon ion-ios-arrow-down"></i></button></li>
                        </ul>
                    </div>
                </div>
                <div className='row d-flex flex-column justify-content-between align-items-center' id='redeem-items-container'>
                    <div className='col text-center'>
                        <header>
                        <h5>Redeem your cw points in any cw shop/restaurant !</h5>
                        </header>
                    </div>
                    <div className='col-md-8 col-lg-5 col-xl-5' id='redeem-caroussel'>
                        <div className='carousel slide' data-ride='carousel' id='carousel-1'>
                            <div className='carousel-inner'>
                            <div className='carousel-item active'><img className='w-100 d-block carroussel-image' src={sb} alt='Slide Image'/></div>
                            <div className='carousel-item'><img className='w-100 d-block carroussel-image' src={ss} alt='Slide Image'/></div>
                            <div className='carousel-item'><img className='w-100 d-block carroussel-image' src={smug} alt='Slide Image'/></div>
                            <div className='carousel-item'><img className='w-100 d-block carroussel-image' src={coffee} alt='Slide Image'/></div>
                        </div>
                    <div>
                    <a className='carousel-control-prev' href='#carousel-1' role='button' data-slide='prev'><span className='carousel-control-prev-icon'></span><span className='sr-only'>Previous</span></a><a className='carousel-control-next' href='#carousel-1' role='button'
                        data-slide='next'><span className='carousel-control-next-icon'></span><span className='sr-only'>Next</span></a></div>
                    <ol className='carousel-indicators'>
                        <li data-target='#carousel-1' data-slide-to='0' className='active'></li>
                        <li data-target='#carousel-1' data-slide-to='1'></li>
                        <li data-target='#carousel-1' data-slide-to='2'></li>
                        <li data-target='#carousel-1' data-slide-to='3'></li>
                    </ol>
                    </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )

    }
    export default cw