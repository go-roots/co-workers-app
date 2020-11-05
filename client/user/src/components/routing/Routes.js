import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Dashboard from '../dashboard/Dashboard'
import Social from '../social/Social'
import Profile from '../profile/view-profile/Profile'
import EditProfile from '../profile/edit-profile/EditProfile'
import Events from '../events/Events'
import Redeem from '../redeem-cwpoints/Redeem'
import Consumption from '../consumption/Consumption'
import NotFound from '../layout/NotFound'
import PrivateRoute from './PrivateRoute'
import Alert from '../../components/layout/Alert'


const Routes = () => {
    return (
        <Fragment>
            <Navbar />
            <Alert />
            <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/social' component={Social} />
                <PrivateRoute exact path='/profile/:userId' component={Profile} />
                <PrivateRoute exact path='/profile/edit-profile/:profileId' component={EditProfile} />
                <PrivateRoute exact path='/events' component={Events} />
                <PrivateRoute exact path='/cw-points' component={Redeem} />
                <PrivateRoute exact path='/consumption' component={Consumption} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}


export default Routes