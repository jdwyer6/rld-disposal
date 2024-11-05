import DashboardNav from "../components/dashboardNav";
import React, { useEffect } from 'react';
import gapi from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const Dashboard_Calendar = () => {

    return (
        <div className="flex container my-md">
            <div className="flex-1 dashboard-left-nav">
                <DashboardNav />
            </div>
            <div className="flex-6">
                <button className="mb-sm">Create New Event</button>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%230eaaaa&title=RLD%20Disposal&src=ZmxlY2tzYXBwbGlhbmNlY2VudGVyQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style={{border: 'solid 1px #777'}} width="100%" height="1200" frameBorder="0" scrolling="no" className="google-calendar"></iframe>
            </div>

        </div>
    )
}
 
export default Dashboard_Calendar;