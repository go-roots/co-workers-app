import React, { Fragment } from 'react';
import graph from '../../assets/img/graph-consumption.png'

const Graph = () => {
    return (
        <Fragment>
            <div class="row">
                <div class="col d-flex flex-column align-items-center">
                    <h3 class="text-center consumption-title">My electricity consumption</h3>
                    <img class="img-fluid" src={graph} />
                    <p className="lead text-center" id="consumption-graph-label">You use less electricity than 80% of the
                    members.</p>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Graph
