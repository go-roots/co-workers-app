import React from 'react'
import medals from '../../assets/img/set-medals.svg'

const Points = ({ cwpoints }) => {
    return (
        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <div className="text-center" id="medal-points-container">
                <p>You earned <b>{cwpoints}</b> CW Points !</p><img alt='' className="img-fluid" src={medals} />
            </div>
        </div>
    )
}

export default Points
