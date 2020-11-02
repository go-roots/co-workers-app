import React from 'react'
import graph from '../../assets/img/graph-consumption.png'

const Graph = () => {
    return (
        <div className="row">
        <div className="col d-flex flex-column align-items-center">
            <h3 className="text-center consumption-title">My electricity consumption</h3>
            <img className="img-fluid" src={graph}/>
        </div>
    </div>
    )
}

export default Graph
