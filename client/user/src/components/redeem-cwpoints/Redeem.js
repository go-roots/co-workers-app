import React, { Fragment } from 'react'
import History from './History'
import Points from './Points'
import Products from './Products'


const Redeem = () => {
    return (
        <section className="container main">
          <div className="row">
            <Points />
            <History />
          </div>
            <Products />
        </section>
    )
}

export default Redeem
