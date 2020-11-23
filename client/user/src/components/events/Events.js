import React, {Fragment, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchEvents} from '../../store/actions/events'


const Events = () => {

    const events = useSelector(state => state.events);

    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        dispatch(fetchEvents());
    }, []);
    
    useEffect(() => {
        fetchData();
    }, []);

    const [currenEvent, setEvent] = useState()

    return (
        <section className="container main">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1 vh-container-small">
                    <ul className="list-group">
                        {events.events.map(event => 
                            <li className="list-group-item">
                                <div className="d-flex flex-row justify-content-between align-items-start">
                                    <p id="halloween-party-header" style={{ fontFamily: 'Alatsi, sans-serif' }} >{event.title}</p></div>
                                    <p className="text-center" id="halloween-event-text">{event.description}</p>
                            </li>
                        )}
                        
                    </ul>
                </div>
                <div className="col-md-8 col-lg-8 col-xl-7 align-self-center responsive-margin"><img className="img-fluid" src={""} alt="pic" /></div>
            </div>
        </section>

    )
}


export default Events
