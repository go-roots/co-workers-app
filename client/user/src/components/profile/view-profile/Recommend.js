import React, { Fragment } from 'react'

const Recommend = ({ data: profile }) => {
    return (
        <Fragment>
            <div className="col">
                <ul className="list-group">
                    {profile?.profile?.social && (Object.keys(profile.profile.social).includes('linkedin')) && <li className="list-group-item social-link"><span>Recommend {profile.firstName} on&nbsp;<a href={profile.profile.social.linkedin}>Linkedin</a></span>
                    </li>}
                    {((profile?.profile?.social && (Object.keys(profile.profile.social).includes('facebook'))) || (profile?.profile?.social && (Object.keys(profile.profile.social).includes('instagram'))) || (profile?.profile?.social && (Object.keys(profile.profile.social).includes('twitter')))) && <li className="list-group-item social-link"> <span> Follow him on&nbsp; {(profile?.profile?.social && (Object.keys(profile.profile.social).includes('facebook'))) && <a href={profile.profile.social.facebook}>Facebook</a>}&nbsp; {(profile?.profile?.social && (Object.keys(profile.profile.social).includes('instagram'))) &&
                        <a href={profile.profile.social.instagram}>Instagram</a>} &nbsp;</span>{(profile?.profile?.social && (Object.keys(profile.profile.social).includes('twitter'))) && <a href={profile.profile.social.twitter}>Twitter</a>}</li>}
                    {((profile?.profile?.social && (Object.keys(profile.profile.social).includes('github'))) || (profile?.profile?.social && (Object.keys(profile.profile.social).includes('youtube')))) && <li className="list-group-item social-link"><span>Check out his&nbsp;
    {(profile?.profile?.social && (Object.keys(profile.profile.social).includes('github'))) && <a href="#">Github</a>} {((profile?.profile?.social && (Object.keys(profile.profile.social).includes('github'))) && (profile?.profile?.social && (Object.keys(profile.profile.social).includes('youtube')))) && <Fragment>&nbsp; and &nbsp;</Fragment>}{(profile?.profile?.social && (Object.keys(profile.profile.social).includes('youtube'))) && <a href={profile.profile.social.youtube}>Youtube</a>} &nbsp;accounts</span></li>}
                </ul>
            </div>
        </Fragment>
    )
}

export default Recommend
