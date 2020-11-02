import React from 'react'
import { BsExclamationOctagon } from 'react-icons/bs'


const NotFound = () => {
    return (
        <div id="not-found">
            <h2 className="text-primary">
                <BsExclamationOctagon />
                {" "}Page not found
            </h2>
            <h3 className='large'>Sorry, this page does not exist !</h3>
        </div>
    )
}

export default NotFound