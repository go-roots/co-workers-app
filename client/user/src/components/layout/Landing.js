import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/actions/auth';
import logoMedium from '../../assets/img/logo_medium.svg';
import { FaSearchLocation } from 'react-icons/fa';
import { BsChevronCompactDown } from 'react-icons/bs';
import Alert from '../../components/layout/Alert';


const Landing = () => {

    const [search, setSearch] = useState("");
    const [className, setClassName] = useState("");
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <section className="d-flex align-items-center" id="section">
                <div id="overlay">
                    <nav className="navbar navbar-light navbar-expand-md">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <img src={logoMedium} alt="logo" />
                            </a>
                            <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-2">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navcol-2">
                                {!auth.isAuthenticated && !auth.isLoading ? (
                                    <ul className="nav navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="btn btn-outline-success nav-login" to="/login">LOGIN</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="btn btn-outline-success nav-login" to="/register">REGISTER</Link>
                                        </li>
                                    </ul>) : (
                                        <ul className="nav navbar-nav ml-auto">
                                            <li className="nav-item">
                                                <Link className="btn btn-outline-success nav-login" to="/dashboard">GO TO DASHBOARD</Link>
                                            </li>
                                            <li className="nav-item">
                                                <button className="btn btn-outline-success nav-login" onClick={e => dispatch(logout())} >LOGOUT</button>
                                            </li>
                                        </ul>
                                    )}
                            </div>
                        </div>
                    </nav>
                    <Alert />
                    <div className="d-flex flex-column justify-content-between align-items-center" id="content">
                        <div className="form-group row input-field">
                            <div className="col-xl-12 offset-xl-0 d-flex">
                                <a className="input-icons" href="#">
                                    <FaSearchLocation />
                                </a>
                                <input value={search} onChange={e => setSearch(e.target.value)} className="my-auto input-field form-control" type="search" placeholder="Find a workspace nearby" size="40"></input>
                            </div>
                        </div>
                        {search.length > 0 ? (
                            <div className="container d-flex flex-row justify-content-center flex-wrap" id="headerContainer" style={{ flexFlow: "row wrap" }}>
                                <div className="row">
                                    <div className="col-11 col-sm-5 col-md-5 col-xl-5 offset-1 offset-sm-0 offset-md-0 offset-lg-0 offset-xl-0">
                                        <div id="map-results">
                                            <ul className="list-group">
                                                <li className="list-group-item map-results-item"><span>Jean Jaurès 1.5km</span></li>
                                                <li className="list-group-item map-results-item"><span>François Verdier 2.4km</span></li>
                                                <li className="list-group-item map-results-item"><span>Carmes 2.5km</span></li>
                                                <li className="list-group-item map-results-item"><span>Esquirol 3.5km</span></li>
                                                <li className="list-group-item map-results-item"><span>Colomiers 10km</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-11 col-sm-7 col-md-7 offset-1 offset-sm-0 offset-md-0 offset-lg-0 offset-xl-0">
                                        <div id="map"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <div id="headerContainer">
                                    <h1 className="text-center" data-aos="flip-down" data-aos-duration="500" data-aos-once="true" id="COworking">CO workers</h1>
                                    <h2 className="text-center" data-aos="flip-down" data-aos-duration="500" data-aos-delay="1000" data-aos-once="true" id="COworking-1">Be social,&nbsp;</h2>
                                    <h2 className="text-center" data-aos="flip-down" data-aos-duration="500" data-aos-delay="2000" data-aos-once="true" id="COworking-2" style={{ fontSize: "44px" }}>be green.</h2>
                                </div>
                            )}
                        <a href="#video">
                            <button
                                className="btn btn-link btn-block text-white arrow-button"
                                type="button"
                            >
                                <BsChevronCompactDown
                                    onMouseEnter={() => setClassName("animate__animated animate__bounce")}
                                    onMouseLeave={() => {
                                        setTimeout(() => {
                                            setClassName("")
                                        }, 500)
                                    }}
                                    className={className} />
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            <section className="d-flex flex-column justify-content-center align-items-center" id="video">
                <iframe allowFullScreen="" frameBorder="0" src="https://www.youtube.com/embed/mm6vO9Os7vs" id="videoPlayer" width="560" height="315"></iframe>
                <Link id="join-now-button" className="btn btn-lg btn-outline-success" to="/register">Join now !</Link>
            </section>
        </Fragment>
    )
}


export default Landing;