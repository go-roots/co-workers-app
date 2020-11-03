import React, { Fragment } from 'react'
import Graph from './Graph'
import Billing from './Billing'


const Consumption = () => {
    return (
        <Fragment>
            <section className="container main">
                <Graph />
                <Billing />
            </section>
        </Fragment>
    )
}

export default Consumption
