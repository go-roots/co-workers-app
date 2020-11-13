import React from 'react'
import { useSelector } from 'react-redux'
import History from './History'
import Points from './Points'
import Products from './Products'
import Spinner from '../UI/Spinner'


const Redeem = () => {

  const auth = useSelector(state => state.auth);

  if (auth.loading) {
    return <Spinner />
  }

  return (
    <section className="container main">
      <div className="row">
        <Points cwpoints={auth.user.cwpoints.current} />
        <History history={auth.user.cwpoints.history} />
      </div>
      <Products />
    </section>
  )
}

export default Redeem
