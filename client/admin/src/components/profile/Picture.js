import React from 'react'
import picture from '../../assets/img/dogs/image2.jpeg'

const Picture = () => {
    return (
        <div className="card mb-3">
            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={picture}
                width="160" height="160" />
                <div className="mb-3">
                    <button className="btn btn-primary btn-sm" type="button">Change Photo</button>
                </div>
            </div>
        </div>
    )
}

export default Picture
