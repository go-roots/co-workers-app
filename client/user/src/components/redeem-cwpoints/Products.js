import React from 'react'
import { useSelector } from 'react-redux'


const Products = ({ data: redeemables }) => {

    const baseUrl = useSelector(state => state.globalVars.currentDomain);

    return (
        <div className="row d-flex flex-column justify-content-between align-items-center" id="redeem-items-container">
            <div className="col text-center">
                <header>
                    <h5>Redeem your cw points in any cw shop/restaurant !</h5>
                </header>
            </div>
            <div className="col-md-8 col-lg-5 col-xl-5" id="redeem-caroussel">
                <div className="carousel slide" data-ride="carousel" id="carousel-1">
                    <div className="carousel-inner">
                        {redeemables.map((r, index) => (
                            index === 0
                                ? (<div key={r._id} className="carousel-item active">
                                    <img className="w-100 d-block carroussel-image" src={`${baseUrl}/redeemables/${r.photo}`} alt="" />
                                </div>)
                                : <div key={r._id} className="carousel-item">
                                    <img className="w-100 d-block carroussel-image" src={`${baseUrl}/redeemables/${r.photo}`} alt="" />
                                </div>
                        ))}
                    </div>
                    <div>
                        <a className="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carousel-1" role="button" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <ol className="carousel-indicators">
                        {redeemables.map((r, index) => (
                            index === 0
                                ? (<li key={r._id} data-target="#carousel-1" className="active" data-slide-to="1"></li>)
                                : (<li key={r._id} data-target="#carousel-1" data-slide-to="1"></li>)
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Products
