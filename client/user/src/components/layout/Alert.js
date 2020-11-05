import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const alerts = useSelector(state => Object.values(state.alerts));

    return (<Fragment>
        {alerts && alerts.map(alert => {
            return (<div key={alert.id} className={`alert alert-${alert.color}`}>
                {alert.message}
            </div>)
        })}
    </Fragment>)

}

export default Alert;
