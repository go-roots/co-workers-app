import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import History from './History'
import Points from './Points'
import Products from './Products'
import Spinner from '../UI/Spinner'
import { fetchRedeemables } from '../../store/actions/redeemables'


const Redeem = () => {

  const auth = useSelector(state => state.auth);
  const redeemables = useSelector(state => state.redeemables.redeemables);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRedeemables());
  }, []);

  if (auth.loading) {
    return <Spinner />
  }

  return (
    <section className="container main">
      <div className="row">
        <Points cwpoints={auth.user.cwpoints.current} />
        <History history={auth.user.cwpoints.history} />
      </div>
      <Products data={redeemables} />
    </section>
  )
}

export default Redeem
