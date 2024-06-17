import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from '../components/dashboardNav';
// Import Bootstrap CSS in case it's not globally imported
// import 'bootstrap/dist/css/bootstrap.min.css';

const ShutOff = () => {
    // State to manage toggle
    const [isToggled, setIsToggled] = useState(false);

    // Function to toggle the state
    const toggle = () => setIsToggled(!isToggled);
    console.log(isToggled);

    return (
        <>
            <div className="container flex align-top my-md">
                <div className="flex-1 dashboard-left-nav">
                    <DashboardNav />
                </div>
                <div className="flex-6">
                    <h1 className="text-center">Emergency Site Shut Off</h1>
                    <p className="text-center">This button will temporarily turn off the website and replace it with a friendly message about temporarily not having availability. It can be used if you are getting too many orders to keep up with.</p>
                    <button onClick={toggle} className={`btn ${isToggled ? 'btn-danger' : 'btn-success'}`}>
                        {isToggled ? 'Turn Site Back On' : 'Turn Off Site'}
                    </button>
                    {isToggled && (
                        <div>
                            <strong>The site is currently OFF.</strong>
                        </div>
                    )}
                    {!isToggled && (
                        <strong>The site is currently ON.</strong>
                    )}
                </div>
            </div>
        </>
    );
}

export default ShutOff;