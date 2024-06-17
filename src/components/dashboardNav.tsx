import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHouse, faCalendar, faList, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
    return ( 
        <div className="mt-10">
            <ul>
                <li className="mb-4"><Link to="/admin"><FontAwesomeIcon className="mr-4" icon={faHouse} /> Home</Link></li>
                <li className="mb-4"><a><FontAwesomeIcon icon={faPlus} className="mr-4" /> Create</a></li>
                <li className="mb-4"><Link to="/admin/calendar"><FontAwesomeIcon className="mr-4" icon={faCalendar} /> Calendar</Link></li>
                <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faList} /> Services</a></li>
                <li className="mb-4"><Link to="/admin/shutoff"><FontAwesomeIcon className="mr-4" icon={faPowerOff} /> Emergency Shut Off</Link></li>
            </ul>
        </div>
    );
}
 
export default DashboardNav;