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


const Routes = () => {
    return (
        <Fragment>
            <Navbar />
            <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/social' component={Social} />
                <Route exact path='/profile/:userId' component={Profile} />
                <Route exact path='/profile/edit-profile/:profileId' component={EditProfile} />
                <Route exact path='/events' component={Events} />
                <Route exact path='/cw-points' component={Redeem} />
                <Route exact path='/consumption' component={Consumption} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}


export default Routes