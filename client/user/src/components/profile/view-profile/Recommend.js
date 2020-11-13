import React, { Fragment } from 'react'

const Recommend = ({data: profile}) => {
    return (
        <Fragment>
            <div className="col">
                <ul className="list-group">
                     {('linkedin' in profile.profile.social) && <li className="list-group-item social-link"><span>Recommend {profile.firstName} on&nbsp;<a href={profile.profile.social.linkedin}>Linkedin</a></span>
                    </li>}
                    {('facebook' in profile.profile.social || 'instagram' in profile.profile.social || 'twitter' in profile.profile.social) && <li className="list-group-item social-link"> <span> Follow him on&nbsp; {'facebook' in profile.profile.social && <a href={profile.profile.social.facebook}>Facebook</a>}&nbsp; {'instagram' in profile.profile.social &&
                     <a href={profile.profile.social.instagram}>Instagram</a>} &nbsp;</span>{'twitter' in profile.profile.social && <a href={profile.profile.social.twitter}>Twitter</a>}</li> }
                    {('github' in profile.profile.social || 'youtube' in profile.profile.social) && <li className="list-group-item social-link"><span>Check out his&nbsp;
    {'github' in profile.profile.social && <a href="#">Github</a>} {('github' in profile.profile.social && 'youtube' in profile.profile.social) && <Fragment>&nbsp; and &nbsp;</Fragment>}{'youtube' in profile.profile.social && <a href={profile.profile.social.youtube}>Youtube</a>} &nbsp;accounts</span></li>}
                </ul>
            </div>
        </Fragment>
    )
}

export default Recommend
