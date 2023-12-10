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
                <div className="mt-10">
                    <ul>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faHouse} /> Home</a></li>
                        <li className="mb-4"><a><FontAwesomeIcon icon={faPlus} className="mr-4" /> Create</a></li>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faCalendar} /> Calendar</a></li>
                        <li className="mb-4"><a><FontAwesomeIcon className="mr-4" icon={faList} /> Services</a></li>
                    </ul>
                </div>
                
            </div>
            <div className="flex-grow ml-12">
                <h2>Orders</h2>
                <input className="border search-bar mb-sm" type="text" placeholder="Search" />
                <b>Filter by:</b>
                <div className="flex my-2 mb-sm">
                    <div className="pill hover-secondary">
                        <p>Date</p>
                    </div>
                    <div className="pill hover-secondary">
                        <p>Service Status</p>
                    </div>
                    <div className="pill hover-secondary">
                        <p>Payment Status</p>
                    </div>
                    <div className="pill hover-secondary">
                        <p>To Do</p>
                    </div>
                </div>
                <div>
                    <div className="order-card">
                        <p><strong>Customer: </strong>Mike D</p>
                        <p><strong>Date of Delivery: </strong>TBD</p>
                        <p><strong>Address: </strong>15 Jefferson Dr.</p>
                        <p><strong>Job: </strong> Install Anti Tip Bracket</p>
                        <p><strong>Notes: </strong> "Please complete ASAP."</p>
                        <p><strong>Price: </strong> $45.00</p>
                        <p><strong>Payment Collected: </strong> No</p>
                        <p><strong>Order Status: </strong> Pending → <b className="color-status-accepted">Accepted</b> → Delivered → Complete</p>
                    </div>
                    <div className="order-card">
                        <p><strong>Customer: </strong>Tim D</p>
                        <p><strong>Date of Delivery: </strong> TBD</p>
                        <p><strong>Address: </strong> 15 Jefferson Dr.</p>
                        <p><strong>Job: </strong> Install Anti Tip Bracket</p>
                        <p><strong>Notes: </strong> "Please complete ASAP."</p>
                        <p><strong>Price: </strong> $45.00</p>
                        <p><strong>Payment Collected: </strong> No</p>
                        <p><strong>Order Status: </strong> <b className="color-status-pending">Pending</b> → Accepted → Delivered → Complete</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard_Home;