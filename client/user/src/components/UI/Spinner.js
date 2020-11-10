import React from 'react';
import spinner from '../../assets/img/spinner.gif';


const Spinner = props => {
    return (
        <div {...props}>
            <img
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </div>
    )
}


export default Spinner
