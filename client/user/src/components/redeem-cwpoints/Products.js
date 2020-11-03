import React from 'react'
import shooping from '../../assets/img/shooping-bag.png'
import straw from '../../assets/img/steel-straw.jpg'
import mug from '../../assets/img/steel-mug.png'
import coffee from '../../assets/img/coffee.jpg'

const Products = () => {
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
                        <div className="carousel-item active"><img className="w-100 d-block carroussel-image"
                            src={shooping} alt="Slide Image" />
                        </div>
                        <div className="carousel-item"><img className="w-100 d-block carroussel-image"
                            src={straw} alt="Slide Image" /></div>
                        <div className="carousel-item"><img className="w-100 d-block carroussel-image"
                            src={mug} alt="Slide Image" /></div>
                        <div className="carousel-item"><img className="w-100 d-block carroussel-image"
                            src={coffee} alt="Slide Image" /></div>
                    </div>
                    <div><a className="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev"><span
                        className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a
                            className="carousel-control-next" href="#carousel-1" role="button"
                            data-slide="next"><span className="carousel-control-next-icon"></span><span
                                className="sr-only">Next</span></a></div>
                    <ol className="carousel-indicators">
                        <li data-target="#carousel-1" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel-1" data-slide-to="1"></li>
                        <li data-target="#carousel-1" data-slide-to="2"></li>
                        <li data-target="#carousel-1" data-slide-to="3"></li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Products
