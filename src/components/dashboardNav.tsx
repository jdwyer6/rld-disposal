import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHouse, faCalendar, faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
    return ( 
        <div className="mt-10">
            <ul>
                <li className="mb-4"><Link to="/dashboard-home"><FontAwesomeIcon className="mr-4" icon={faHouse} /> Home</Link></li>
                <li className="mb-4"><a><FontAwesomeIcon icon={faPlus} className="mr-4" /> Create</a></li>
                <li className="mb-4"><Link to="/dashboard-calendar"><FontAwesomeIcon className="mr-4" icon={faCalendar} /> Calendar</Link></li>
                <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faList} /> Services</a></li>
            </ul>
        </div>
    );
}
 
export default DashboardNav;