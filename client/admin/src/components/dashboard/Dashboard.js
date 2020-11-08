import React from 'react';
import Charts from './Charts'
import Events from './Events'; //check the react-chartjs-2 lib (already installed)
import SystemLog from './SystemLog'


const Dashboard = () => {
    return (
        <div className="container-fluid">
            <Charts />
            <div className="row">
                <SystemLog />
                <Events />
            </div>
        </div>
    )
}

export default Dashboard


