import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { start } from 'repl';
import { getSessionService } from '../services/sessionService';
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from '../config/firebase';


type pdpProps = {
    title: string,
    photo: string,
    startingPrice: number,
    jobInfo: any,
    setJobInfo: any,
    service: string,
    showApplianceLocationDropdown: boolean,
    startingAppliance: string,
    startingLocation: string,
    setNumOfCartItems?: any
}
  

const PDP = ({title, photo, startingPrice, jobInfo, setJobInfo, service, showApplianceLocationDropdown, startingAppliance, startingLocation, setNumOfCartItems}: pdpProps) => {

    const [currentServices, setCurrentServices] = useState({
            service: service,
            appliance: startingAppliance,
            location: startingLocation,
            price: startingPrice
    })

    const [ showModal, setShowModal ] = useState(false);


    const locations = [
        {
            name: "curb",
            description: "Driveway, curb or garage"
        },
        {
            name: "inside",
            description: "Inside the home - Uninstallation needed"
        },
        {
            name: "inside-uninstalled",
            description: "Inside the home - Appliance already uninstalled"
        }
    ];

    const prices = {
        "haulAway": {
            "curb": 50,
            "inside" : 90,
            "inside-uninstalled" : 65
        },
        "install": {
            "refrigerator": 40,
            "range": 60,
            "washer": 50,
            "dryer": 80,
            "dishwasher": 10,
            "cooktop": 20,
            "microwave": 40
        }
    }

    const setPrice = () => {
        const service = currentServices.service as keyof typeof prices;
        const location = currentServices.location as keyof typeof prices[typeof service];
        const appliance = currentServices.appliance as keyof typeof prices[typeof service];
        if (service === "haulAway") {
            setCurrentServices((prevState: typeof currentServices) => ({
                ...prevState,
                price: prices[service][location]
            }));
        } else {
            setCurrentServices((prevState: typeof currentServices) => ({
                ...prevState,
                price: prices[service][appliance]
                
            }));
        }
    }

    const selectAppliance = (appliance: string) => {
        setCurrentServices((prevState: typeof currentServices) => ({
            ...prevState,
            appliance: appliance
        }));
    }

    const selectLocation = (location: string) => {
        setCurrentServices((prevState: typeof currentServices) => ({
            ...prevState,
            location: location
        }));
    }
    
    useEffect(() => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            price: startingPrice
        }))
        setCurrentServices((prevState: typeof currentServices) => ({
            ...prevState,
            service: service
        }));
    }, [])

    useEffect(() => {
        setPrice();
    }, [currentServices.service, currentServices.location, currentServices.appliance]);
    
    const addToCart = () => {
        // Retrieve the current services array from session storage and handle the case where it might be null
        const servicesString = sessionStorage.getItem('services');
        const services = servicesString ? JSON.parse(servicesString) : [];
    
        if (currentServices.appliance) {
            // Push the current service to the services array
            services.push(currentServices);
            
            // Save the updated services array to session storage
            sessionStorage.setItem('services', JSON.stringify(services));

            // Update the number of cart items in the navigation bar
            const newServices = sessionStorage.getItem('services');
            setNumOfCartItems(newServices ? JSON.parse(newServices).length : 0);
            
            // Optionally, show a modal or perform any other actions
            setShowModal(true);
        } else {
            alert("Please select an option for each field.");
        }
    };
    
    return ( 
        <div className="container">
            <div className='row mt-5'>
                <div className="col">
                    <img src={photo} alt="service-photo" width='800' height='800'/>
                </div>
                <div className="col ms-5">
                    <h1>{title}</h1>
                        <h1>${currentServices.price}</h1>
                    <hr></hr>
                    <strong>Select an appliance</strong>
                    <div className='flex flex-wrap justify-center appliance-selection-container'>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "refrigerator" ? 'selected' : ''}`} onClick={() => selectAppliance("refrigerator")}>
                            <span>Refrigerator</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "range" ? 'selected' : ''}`} onClick={()=>selectAppliance("range")}>
                            <span>Range</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "washer" ? 'selected' : ''}`} onClick={()=>selectAppliance("washer")}>
                            <span>Washer</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "dryer" ? 'selected' : ''}`} onClick={()=>selectAppliance("dryer")}>
                            <span>Dryer</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "dishwasher" ? 'selected' : ''}`} onClick={()=>selectAppliance("dishwasher")}>
                            <span>Dishwasher</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "cooktop" ? 'selected' : ''}`} onClick={()=>selectAppliance("cooktop")}>
                            <span>Cooktop</span>
                        </button>
                        <button className={`btn-secondary my-1 ${currentServices.appliance === "microwave" ? 'selected' : ''}`} onClick={()=>selectAppliance("microwave")}>
                            <span>Microwave</span>
                        </button>
                    </div>
                    
                    {showApplianceLocationDropdown && (
                        <>
                            <strong className="text-lg mb-3">Select a location.</strong>
                            <select className="item-container" onChange={(e)=>selectLocation(e.target.value)}>
                                {locations.map((location, locationIndex) => (
                                    <option 
                                        key={locationIndex} 
                                        value={location.name} 
                            >
                                        {location.description}
                                    </option> ))}
                            </select>
                        </>

                    )}

                    <button className="my-sm" onClick={addToCart}>Add to Cart</button>
                </div>
                
            </div>

                    {showModal ? (
                        <div className="added-to-cart-modal">
                            <h1>Thanks for selecting a service</h1>
                            <p className="text-center">What would you like to do now?</p>
                            <div className="btn-container">
                                <Link to="/services" className="flex-1">
                                    <button className="btn-secondary me-2">Add another service or appliance</button>
                                </Link>
                                <Link to="/cart" className="flex-1">
                                    <button className="ms-2">Finalize and submit</button>
                                </Link>
                                
                            </div>
                        </div>
                    ) : ''}



        </div>


    );
}
 
export default PDP;