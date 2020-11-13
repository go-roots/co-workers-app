import React from 'react'
import { useSelector } from 'react-redux'
import History from './History'
import Points from './Points'
import Products from './Products'


const Redeem = () => {

  const cwpoints = useSelector(state => state.auth.user.cwpoints);

  return (
    <section className="container main">
      <div className="row">
        <Points cwpoints={cwpoints.current} />
        <History history={cwpoints.history} />
      </div>
      <Products />
    </section>
  )
}

export default Redeem
