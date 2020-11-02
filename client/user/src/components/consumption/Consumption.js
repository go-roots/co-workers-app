import React, { Fragment } from 'react'
import Graph from './Graph'
import Billing from './Billing'


const Consumption = () => {
    return (
        <section className="container main">
            <Graph />
            <Billing />
        </section>
    )
}

export default Consumption
