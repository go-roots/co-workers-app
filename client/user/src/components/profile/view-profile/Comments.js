import React from 'react';
import pp from '../../../assets/img/notif-profile-picture.jpg';

const Comments = () => {
    return (
        <div className="row">
            <div className="col responsive-margin">
                <div className="d-flex flex-column justify-content-start" id="profile-user-recommendations">
                    <div className="profile-recommendation-element">
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={pp} />
                            <p>Jorgo - 21/09/2020</p>
                        </div>
                        <p>Bob helped me a lot on a super complicated topic, he is a true professional</p>
                    </div>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={pp} />
                            <p>Ilya - 30/07/2020</p>
                        </div>
                        <p>Bob saved me a lot of time by helping fixing my wind direction sensor</p>
                    </div>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={pp} />
                            <p>Shradda - 01/03/2020</p>
                        </div>
                        <p>A great technician, Bob gave me precious advise !</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
