import React, { Fragment } from 'react';
import graph from '../../assets/img/graph-consumption.png'

const Graph = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col d-flex flex-column align-items-center">
                    <h3 className="text-center consumption-title">My electricity consumption</h3>
                    <img className="img-fluid" src={graph} />
                    <p className="lead text-center" id="consumption-graph-label">You use less electricity than 80% of the
                    members.</p>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Graph
