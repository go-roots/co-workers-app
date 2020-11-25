import React from 'react'
import Notification from '../../models/Notification';


const Notifications = ({ data: { notifications, profiles, profile, events, user, helpR } }) => {

    return (
        <div className="card vh-container">
            <div className="card-body">
                <h4 className="card-title">Notifications</h4>
                {notifications.length ? (<ul className="list-group">
                    {notifications.map(notif => {
                        let data = {};
                        if (notif.type === 'event') {
                            data = {
                                notif,
                                event: events.find(event => event._id == notif.identifier),
                                user
                            };
                        };
                        if (notif.type === 'friend-request') {
                            data = {
                                notif,
                                user,
                                profile: profiles.find(p => p._id == notif.trigger)
                            };
                        };
                        if (notif.type === 'help-request' || notif.type === 'post-help-request' || notif.type === 'accept-help-request') {
                            data = {
                                notif,
                                helpr: helpR.find(h => h._id == notif.identifier),
                                profile: profiles.find(p => p._id == notif.trigger)
                            };
                        };
                        if (notif.type === 'recommendation-comments') {
                            data = {
                                notif,
                                user,
                                myProfile: profile,
                                profile: profiles.find(p => p._id == notif.trigger)
                            };
                        };
                        return (
                            <Notification
                                data={data}
                            />
                        )
                    })}
                </ul>) : null}
            </div>
        </div>
    )
}


export default Notifications
