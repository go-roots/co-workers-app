import React, { Fragment } from 'react'
import History from './History'
import Points from './Points'
import Products from './Products'


const Redeem = () => {
  return (
    <Fragment>
    <section class="container main">
      <div className="row">
        <Points />
        <History />
      </div>
      <Products />
    </section>
    </Fragment>
  )
}

export default Redeem
