import React from 'react'


const Events = () => {
    return (
        <section className="container main">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1 vh-container-small">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="d-flex flex-row justify-content-between align-items-start">
                                <p id="halloween-party-header" style={{ fontFamily: 'Alatsi, sans-serif' }} >Halloween party</p></div>
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
                <div className="col-md-8 col-lg-8 col-xl-7 align-self-center responsive-margin"><img className="img-fluid" src={""} alt="pic" /></div>
            </div>
        </section>

    )
}


export default Events
