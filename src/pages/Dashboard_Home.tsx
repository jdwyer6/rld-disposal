import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHouse, faCalendar, faList } from '@fortawesome/free-solid-svg-icons';


const Dashboard_Home = () => {
                    
    return ( 
        
        <div className="flex container-main">
            <div className="border-r border-slate-200 w-1/6">
                {/* <button className="btn-primary mb-4"><FontAwesomeIcon icon={faPlus} /> Create</button> */}
                <div>
                    <ul>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faHouse} /> Home</a></li>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faCalendar} /> Calendar</a></li>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faList} /> Services</a></li>
                    </ul>
                </div>
                
            </div>
            <div className="">
                <h2>Orders</h2>
                <input className="border" type="text" placeholder="Search" />
            </div>
        </div>
     );
}
 
export default Dashboard_Home;