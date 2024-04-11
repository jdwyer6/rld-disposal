import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHouse, faCalendar, faList } from '@fortawesome/free-solid-svg-icons';
import { db } from '../config/firebase';
import { getDoc, getDocs, collection } from 'firebase/firestore';
import DashboardNav from "../components/dashboardNav";

const Dashboard_Home = () => {
    const jobsCollectionRef = collection(db, "jobs");
    const [jobs, setJobs] = useState<{ id: string }[]>([]);
    const orderStatus = ["Pending", "Accepted", "Delivered", "Complete"];
    const [ showFullCard, setShowFullCard ] = useState(false);
    const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

    const getJobs = async () => {
    
        try {
            const data = await getDocs(jobsCollectionRef)
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            
            
            setJobs(filteredData);
            console.log(jobs)
            
        } catch (err) {
            console.error(err)
        }
    }

    const toggleCard = (id:number) => {
        setExpandedCards({
            ...expandedCards,
            [id]: !expandedCards[id]
        })

    }

    useEffect(() => {
        getJobs();
    }, []);
                    
    return ( 
        
        <div className="container-fluid flex align-top my-md">
            <div className="flex-1 dashboard-left-nav">
                <DashboardNav />
            </div>
            
            <div className="flex-6">
                <h2>Orders</h2>
                <input className="border search-bar mb-sm" type="text" placeholder="Search" />
                <b>Filter by:</b>
                <div className="flex my-2 mb-sm">
                    <div className="pill hover-secondary">Date</div>
                    <div className="pill hover-secondary">Service Status</div>
                    <div className="pill hover-secondary">Payment Status</div>
                    <div className="pill hover-secondary">To Do</div>
                </div>
                <div>
                    {jobs.map((job: any, index) => (
                        <div key={index} className={`order-card border-status-${job.orderStatus}`} onClick={()=>toggleCard(job.id)}>
                            
                            <p><strong>Customer: </strong>{job.first_name} {job.last_name}</p>
                            <p><strong>Phone: </strong>{job.phone}</p>
                            <a className={expandedCards[job.id] === true ? 'hide' : 'show'}>Click to expand</a>
                            <div className={expandedCards[job.id] === true ? 'show' : 'hide'}>
                                <b>Services Requested:</b>
                                <ul>
                                {job.services.map((service:any, serviceIndex:number) => (
                                    <li key={serviceIndex}>
                                        <span>{service.service} {service.appliance} {service.location}</span>
                                    </li>
                                ))}
                                </ul>
                                <p><strong>Preferred Delivery Date: </strong>{job.preferred_delivery_date.day} {job.preferred_delivery_date.time}</p>
                                <p><strong>Confirmed Delivery Date: </strong>{job.confirmed_delivery_date}</p>
                                <p><strong>Notes: </strong>"{job.notes}"</p>
                                <p><strong>Price: </strong>${job.price.toFixed(2)}</p>
                                <p><strong>Payment Collected: </strong>{job.payment_collected ? 'Yes' : 'No'}</p>
                                <div className="flex align-center">
                                    <b className="mr-sm">Order Status: </b>
                                {orderStatus.map((status, index) => (
                                    <p style={{marginRight:'10px'}} className={status === orderStatus[job.orderStatus] ? `color-status-${index}` : ''} key={index}>{status} </p>
                                ))}
                                </div>
                                <p><strong>Order Status: </strong>{orderStatus[job.orderStatus]}</p>
                            </div>
        
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard_Home;