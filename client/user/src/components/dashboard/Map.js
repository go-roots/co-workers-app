import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import map2 from '../../assets/img/map2.jpeg'
import Spinner from '../../components/UI/Spinner'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const Map = ({ data: profiles }) => {

    const rooms = useSelector(state => state.rooms.rooms);
    const [imageLoaded, setImageLoaded] = useState(false);
    const initialState = {
        room1: false,
        room2: false,
        room3: false
    }
    const [open, setOpen] = useState(initialState);
    const size = useRef(null);
    //size.current.offsetWidth, size.current.offsetHeight

    // 358   room1      room2       room3
    // |                                   |61
    // | - 81...216 - 216...328 - 329...443
    // |
    // | 
    // |
    // |
    // |
    // |- - - - - - - - - - - - - - - - - - - - - 517

    const roomStyles = {
        room1: {
            position: 'absolute',
            left: '15.68%',
            top: '0px',
            height: '17%',
            width: '25.92%',
            color: 'white'
        },
        room2: {
            position: 'absolute',
            left: '41.78%',
            top: '0px',
            height: '17%',
            width: '21.66%',
            color: 'white'
        },
        room3: {
            position: 'absolute',
            left: '63.9%',
            top: '0px',
            height: '17%',
            width: '22%',
            color: 'white'
        },
        title: {
            marginBottom: '10px',
            textAlign: 'center'
        },
        item: {
            display: 'inline-flex',
            borderBottom: '1px solid grey',
            paddingTop: '10px',
            textAlign: 'center'
        },
        name: {
            paddingTop: '5px',
            marginLeft: '10px'
        }
    }

    if (!size) {
        return <Spinner />
    }

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 200,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);


    const handleTooltipOpen = (e, room) => {
        setOpen({ ...initialState, [room]: !open[room] })
    }

    const handleTooltipClose = () => {
        setOpen(initialState);
    }


    return (
        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-8 offset-sm-0 offset-md-0 offset-xl-0 text-center">
            <div
                style={{ display: imageLoaded ? 'block' : 'none' }}
                ref={size}
                id="map-container"
            >
                {rooms.map(room => {
                    const modifiedName = room.name.replace(' ', '').toLowerCase();
                    return (
                        <HtmlTooltip
                            key={room._id}
                            open={open[modifiedName]}
                            title={
                                <div>
                                    <Typography style={roomStyles.title} color="inherit">{room.name.charAt(0).toUpperCase() + room.name.slice(1)}</Typography>
                                    {profiles.map(profile => profile?.room?.name === room.name && (
                                        <div
                                            key={profile.id}
                                            style={roomStyles.item}
                                            className='col'
                                        >
                                            {profile?.profile?.photo &&
                                                <img className='rounded-circle'
                                                    src={profile.profile.photo}
                                                    alt=''
                                                    width='25'
                                                    height='25'
                                                ></img>
                                            }
                                            <p style={roomStyles.name}>{profile.firstName} {profile.lastName}</p>
                                            <i>{profile?.profile?.story && '"' + profile?.profile?.story + '"'}</i>
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            <div
                                onClick={e => handleTooltipOpen(e, modifiedName)}
                                onMouseEnter={e => handleTooltipOpen(e, modifiedName)}
                                onMouseLeave={e => handleTooltipClose()}
                                style={roomStyles[modifiedName]}
                            >
                                <span style={{ cursor: 'pointer' }} className="badge badge-pill badge-info">{room.users.length}/{room.capacity}</span>
                            </div>
                        </HtmlTooltip>
                    )
                })}
                <img onLoad={e => setImageLoaded(true)} src={map2} alt='' />
            </div>
            <Spinner style={{ display: imageLoaded ? 'none' : 'block' }} />
        </div>
    )
}

export default Map;
