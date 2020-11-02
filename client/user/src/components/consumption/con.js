import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import logoMedium from '../../assets/img/logo_medium.svg';
import gc from'assets/img/graph-consumption.png';
const Consumption = () =>{
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
            <section className='container main'>
                <div className='row'>
                <div className='col d-flex flex-column align-items-center'>
                    <h3 className='text-center consumption-title'>My electricity consumption</h3>
                    <img class='img-fluid' src={gc}/></div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <p className='lead text-center' id='consumption-graph-label'>You use less electricity than 80% of the members.</p>
                        <h3 className='text-center consumption-title'>Billing</h3>
                        <p>Standard formula : 10€ + c * electricity consumption</p>
                        <p>monthly subscription</p>
                        <div className='table-responsive'></div>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>May 2020</th>
                                <th>June 2020</th>
                                <th>July 2020</th>
                                <th>August 2020</th>
                                <th>September 2020</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fixed cost</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Variable cost</td>
                                <td>10</td>
                                <td>5</td>
                                <td>7</td>
                                <td>6</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>20€</td>
                                <td>15€</td>
                                <td>17€</td>
                                <td>16€</td>
                                <td>17€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        
		)
}
export default Consumption;
