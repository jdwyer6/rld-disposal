import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHouse, faCalendar, faList, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DashboardNav = () => {
    const location = useLocation();
    const [ path, setPath ] = useState(location.pathname);
    
    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return ( 
        <div className="mt-10">
            <ul className="list-unstyled dashboard-nav-container">
                <li className={`${path === "/admin" ? 'active' : ''}`}><Link to="/admin"><FontAwesomeIcon className="mr-4" icon={faHouse} /> Home</Link></li>
                <li className={`${path === "/admin/create" ? 'active' : ''}`}><Link to="/admin/create"><FontAwesomeIcon icon={faPlus} className="mr-4" /> Create</Link></li>
                <li className={`${path === "/admin/calendar" ? 'active' : ''}`}><Link to="/admin/calendar"><FontAwesomeIcon className="mr-4" icon={faCalendar} /> Calendar</Link></li>
                <li className={`${path === "/admin/services" ? 'active' : ''}`}><Link to="/admin/services"><FontAwesomeIcon className="mr-4" icon={faList} /> Pricing</Link></li>
                <li className={`${path === "/admin/shutoff" ? 'active' : ''}`}><Link to="/admin/shutoff"><FontAwesomeIcon className="mr-4" icon={faPowerOff} /> Emergency Shut Off</Link></li>
            </ul>
        </div>
    );
}
 
export default DashboardNav;