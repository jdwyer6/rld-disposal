import {FaWrench, FaTruck} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSessionService } from '../services/sessionService';
import { faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

type cartProps = {
    setNumOfCartItems: any
}

interface Service {
    price: number;
}


const Cart  = ({setNumOfCartItems}: cartProps) => {
    const servicesData = sessionStorage.getItem('services');
    const [services, setServices] = useState(JSON.parse(servicesData ? servicesData : '[]'));
    const navigate = useNavigate();
    const [ price, setPrice ] = useState(0);

    const [jobInfo, setJobInfo] = useState({
        services: services,
        preferred_delivery_date: {
            time: "",
            day: ""
        },
        notes: "",
        price: 0,
        first_name: "",
        last_name: "",
        phone: "",
        confirmed_delivery_date: "",
        payment_collected: false,
        orderStatus: 0,
        number_of_services: 1,
        terms_of_service: {
            payment: false,
            service_area: false
        }
    });
    const jobsCollectionRef = collection(db, "jobs");

    const getServiceTitle = (service: string) => {
        switch(service) {
            case 'install':
                return 'Install';
            case 'haulAway':
                return 'Haul Away';
            default:
                return '';
        }
    }

    const capitalizeFirstLetter = (string: string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getImage = (service: string) => {
        switch(service) {
            case 'install':
                return  <FaWrench />
            case 'haulAway':
                return <FaTruck />
            default:
                return '';
        }
    }

    const removeItem = (idx: number) => {
        const updatedCartItems = jobInfo.services.filter((item: any, index: number) => index !== idx);
        const updatedJobInfo = { ...jobInfo, services: updatedCartItems };
        sessionStorage.setItem('services', JSON.stringify(updatedJobInfo.services));
        setJobInfo(updatedJobInfo);

        // Update the number of cart items in the navigation bar
        const newServices = sessionStorage.getItem('services');
        setNumOfCartItems(newServices ? JSON.parse(newServices).length : 0);

        setServices(updatedCartItems);
        setPrice(calculatePrice(updatedCartItems));
    };

    const handleFirstNameChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            first_name: event.target.value
        }));
    };

    const handleLastNameChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            last_name: event.target.value
        }));
    };

    const handlePhoneChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            phone: event.target.value
        }));
    };


    const handleNotesChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo)  => ({
            ...prevState,
            notes: event.target.value
        }));
    }

    const selectTime = (time: string) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            preferred_delivery_date: {
                ...prevState.preferred_delivery_date,
                time: time
            }
        }));
        console.log(jobInfo);
    }

    const selectDay = (day: string) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            preferred_delivery_date: {
                ...prevState.preferred_delivery_date,
                day: day
            }
        }));
        console.log(jobInfo);
    }

    {/* ---------------Terms and Conditions--------------- */}
    const handlePaymentCheckboxChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            terms_of_service: {
                ...prevState.terms_of_service,
                payment: event.target.checked
            }
        }));
    };
    
    const handleServiceAreaCheckboxChange = (event: any) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            terms_of_service: {
                ...prevState.terms_of_service,
                service_area: event.target.checked
            }
        }));
    };
    
    function validateJobInfo(jobInfo: any) {
        const issues = [];

        jobInfo.first_name = sanitizeInput(jobInfo.first_name);
        jobInfo.last_name = sanitizeInput(jobInfo.last_name);
        jobInfo.phone = sanitizeInput(jobInfo.phone);
        jobInfo.notes = sanitizeInput(jobInfo.notes);
    
        // Check for empty or null strings
        if (!jobInfo.first_name) issues.push(<li>First name is missing.</li>);
        if (!jobInfo.last_name) issues.push(<li>Last name is missing.</li>);
        if (!jobInfo.phone) issues.push(<li>Phone number is missing.</li>);
    
        // Check if preferred_delivery_date is an empty object
        if (!jobInfo.preferred_delivery_date.time) issues.push(<li>Preferred delivery time is missing.</li>);
        if (!jobInfo.preferred_delivery_date.day) issues.push(<li>Preferred delivery day is missing.</li>);
    
        // Check if services array is empty
        if (jobInfo.services.length === 0) issues.push(<li>No services selected.</li>);
    
        // Check terms_of_service fields
        if (!jobInfo.terms_of_service.payment) issues.push(<li>Payment term not accepted.</li>);
        if (!jobInfo.terms_of_service.service_area) issues.push(<li>Service area term not accepted.</li>);
    
        return issues;
    }

    function sanitizeInput(input:any) {
        return DOMPurify.sanitize(input);
    }


    const onSubmit = async () => {
        try {
            const jobInfoWithTimestamp = {
                ...jobInfo,
                createdAt: serverTimestamp(),
            };

            await addDoc(jobsCollectionRef, jobInfoWithTimestamp);
            sessionStorage.removeItem('services');
            setNumOfCartItems(0);
            navigate('/thankyou');

        } catch (err) {
            console.error(err);
            alert("There was an error submitting your request. Please try again later.")
        }
    };

    const calculatePrice = (services: Service[]) => {
        const totalPrice = services.reduce((acc, currentService) => {
            return acc + currentService.price;
        }, 0);
        return totalPrice;
    }

    useEffect(() => {
        setPrice(calculatePrice(services));
    }, [services]);

    if (services.length === 0) return (<div className="container flex flex-col my-lg text-center"><p>Your cart is empty. Click <Link to="/services">here</Link> to schedule a service.</p></div>);
    

    return ( 
        <div className="container flex flex-col">
            <h1 className="text-center my-lg">Cart</h1>

            {/* ---------------Cart Items--------------- */}
            <div className="mb-lg">
                <h3>Your Services</h3>
                {jobInfo.services.map((service: any, index: number) => {
                    return (
                        <div className="flex justify-between cart-item">
                            <div className="flex align-center">
                                <div className="mr-sm cart-item-icon">
                                    {getImage(service.service)}
                                </div>
                                <div className="d-flex flex-col">
                                    <strong>{getServiceTitle(service.service)}</strong>
                                    <span>{capitalizeFirstLetter(`${service.appliance}`)}</span>
                                    <small className="hover-text-delete" onClick={()=>removeItem(index)}>Remove</small>
                                </div>
                            </div>

                            <div>
                                <p>${service.price}</p>
                            </div>
                        </div>
                    )
                })}

                <div className="flex justify-end">
                    <strong className="mr-sm">Estimated Total:</strong>
                    <strong>${price}</strong>
                </div>
            </div>


            

             {/* ---------------Contact Information--------------- */}
            <div className="mb-lg">
                <h3>Contact Information</h3>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="First Name" required onChange={handleFirstNameChange} value={jobInfo.first_name} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" required onChange={handleLastNameChange} value={jobInfo.last_name} />
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" placeholder="Phone Number" required onChange={handlePhoneChange}/>

                
            </div>

            {/* ---------------Date and Time--------------- */}
            <div className="mb-lg">
                <div className="mb-lg">
                    <h3 className="text-center">Select a time of day.</h3>
                    <p className="text-center">Do you prefer for us to arrive in the morning or afternoon?</p>
                    <div className="flex justify-center">
                        <div className={`btn-round ${jobInfo.preferred_delivery_date.time === "morning" ? 'selected' : ''} p-sm`} onClick={()=>selectTime("morning")}>
                            <button
                                data-tooltip-id="morning-tooltip"
                                data-tooltip-content="9:00 am - 12:00 pm"
                                data-tooltip-place="top"
                            ><FontAwesomeIcon className="fa-2xl" icon={faMugSaucer}/></button>
                            <Tooltip id="morning-tooltip" />
                            <p>Morning</p>
                        </div>
                        <div className={`btn-round ${jobInfo.preferred_delivery_date.time === "afternoon" ? 'selected' : ''} p-sm`} onClick={()=>selectTime("afternoon")}>
                            <button
                                data-tooltip-id="afternoon-tooltip"
                                data-tooltip-content="1:30 pm - 4:30 pm"
                                data-tooltip-place="top"
                            ><FontAwesomeIcon className="fa-2xl" icon={faSun} /></button>
                            <Tooltip id="afternoon-tooltip" />
                            <p>Afternoon</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-center">Select a day.</h3>
                    <p className="text-center">Which day works best with your schedule?</p>
                    <div className="item-container justify-center">
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "monday" ? 'selected' : ''}`} onClick={()=>selectDay("monday")}>Monday</button></div>
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "tuesday" ? 'selected' : ''}`} onClick={()=>selectDay("tuesday")}>Tuesday</button></div>
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "wednesday" ? 'selected' : ''}`} onClick={()=>selectDay("wednesday")}>Wednesday</button></div>
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "thursday" ? 'selected' : ''}`} onClick={()=>selectDay("thursday")}>Thursday</button></div>
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "friday" ? 'selected' : ''}`} onClick={()=>selectDay("friday")}>Friday</button></div>
                        <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "saturday" ? 'selected' : ''}`} onClick={()=>selectDay("saturday")}>Saturday</button></div>
                
                    </div>
                </div>  
            </div>

            {/* ---------------Notes--------------- */}
            <div className="mb-lg">
                <h3>Notes</h3>
                <p>Please note anything special we should know about your request or any questions you may have.</p>
                <textarea onChange={handleNotesChange} value={jobInfo.notes} placeholder="Optional"/>
            </div>

            {/* ---------------What's Next--------------- */}
            <div className="mb-lg">
                <h3>What's Next?</h3>
                <ul>
                    <li>You will receive a call from us to confirm a date and time for your selected service(s) along with your confirmed total.</li>
                    <li>Transaction details such as address of selected service, will be collected during your confirmation phone call.</li>
                    <li>Payment will be collected on the day of the service.</li>
                </ul>
            </div>

            {/* ---------------Terms and Conditions--------------- */}
            <div className="mb-lg">
                <h3>One last thing...</h3>
                <b>Terms of service</b>
                <p>Please read and click the check boxes to confirm the following:</p>
                <div>
                    <div className="d-flex">
                    <input type="checkbox" id="payment" name="payment" required onChange={handlePaymentCheckboxChange} checked={jobInfo.terms_of_service.payment} />
                        <label htmlFor="payment">I understand that we only accept <b>cash</b>, <b>check</b> or <b>money order</b>.</label>
                    </div>
                    <div className="d-flex">
                        <input type="checkbox" id="service-area" name="service-area" required onChange={handleServiceAreaCheckboxChange} checked={jobInfo.terms_of_service.service_area} />
                        <label htmlFor="service-area">I understand RLD Disposal only provides service within 40 miles of <b>St Louis</b> and <b>St Louis County</b></label>
                    </div>
                </div>
            </div>

            {/* ---------------Validation List--------------- */}
            <div>
                <ul className="validation-list">
                    {validateJobInfo(jobInfo)}
                </ul>
            </div>
            <button disabled={validateJobInfo(jobInfo).length > 0} onClick={onSubmit}>Submit</button>
        </div>
    );
}
 
export default Cart;