import React, { Fragment } from 'react';
import moment from 'moment'
import pp from '../../../assets/img/notif-profile-picture.jpg';

const Comments = ({comments}) => {
    console.log(comments)
    return (
        <div className="row">
            <div className="col responsive-margin">
                <div className="d-flex flex-column justify-content-start" id="profile-user-recommendations">
                    <div className="profile-recommendation-element">
                        {comments.length === 0 && <p> No comments yet !</p>}
                        {comments.map(comment => 
                            <Fragment>
                                <div className="d-flex flex-row justify-content-between align-items-baseline"><img src={pp} />
                                    <p>Jorgo - {moment(comment.date).format('YYYY-MM-DD')}</p>
                                </div>
                                <p>{comment.text}</p>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
