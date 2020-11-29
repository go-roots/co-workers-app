import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Dashboard from '../dashboard/Dashboard'
import Social from '../social/Social'
import Profile from '../profile/view-profile/Profile'
import Events from '../events/Events'
import Redeem from '../redeem-cwpoints/Redeem'
import Consumption from '../consumption/Consumption'
import NotFound from '../layout/NotFound'
import PrivateRoute from './PrivateRoute'
import Alert from '../../components/layout/Alert'
import EditProfile from '../profile/edit-profile/EditProfile'


const Routes = () => {

    const auth = useSelector(state => state.auth);

    if (!auth.isAuthenticated && !auth.loading) {
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            <Navbar />
            <Alert />
            <EditProfile />
            <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/social' component={Social} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/events' component={Events} />
                <PrivateRoute exact path='/cw-points' component={Redeem} />
                <PrivateRoute exact path='/consumption' component={Consumption} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}


export default Routes