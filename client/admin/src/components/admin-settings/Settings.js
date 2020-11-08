import React from 'react'
import Redeemables from './Redeemables'
import Events from './Events'


const Settings = () => {
    return (
        <div class="container-fluid">
            <div className="row">
                <Redeemables />
                <Events />
            </div>
        </div>
    )
}

export default Settings
