import React, { useRef } from 'react'
import map2 from '../../assets/img/map2.jpeg'
import Spinner from '../../components/UI/Spinner'


const Map = () => {

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
            backgroundColor: 'red',
            color: 'white'
        },
        room2: {
            position: 'absolute',
            left: '41.78%',
            top: '0px',
            height: '17%',
            width: '21.66%',
            backgroundColor: 'red',
            color: 'white'
        },
        room3: {
            position: 'absolute',
            left: '63.9%',
            top: '0px',
            height: '17%',
            width: '22%',
            backgroundColor: 'red',
            color: 'white'
        }
    }

    if (!size) {
        return <Spinner />
    }

    return (
        <div className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-8 offset-sm-0 offset-md-0 offset-xl-0 text-center">
            <div ref={size} id="map-container">
                <div style={roomStyles.room1}>
                    Room 1
                </div>
                <div style={roomStyles.room2}>
                    Room 2
                </div>
                <div style={roomStyles.room3}>
                    Room 3
                </div>
                <img src={map2} alt='' />
            </div>
        </div>
    )
}

export default Map;
