import React, { Fragment } from 'react';
import spinner from '../../assets/img/spinner.gif';

const SpinnerSmall = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                style={{ width: '100px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </Fragment>
    )
}

export default SpinnerSmall
