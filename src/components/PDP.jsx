import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { getSessionService } from '../services/sessionService';
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from '../config/firebase';
import { getPrices } from '../services/adminPrefsService';
import SelectAppliance from './SelectAppliance';

const PDP = ({title, photo, startingPrice, jobInfo, setJobInfo, service, showApplianceLocationDropdown, startingAppliance, startingLocation, setNumOfCartItems}) => {
    const [dbPrices, setDbPrices] = useState(null);

    const [currentServices, setCurrentServices] = useState({
            service: service,
            appliance: startingAppliance,
            location: startingLocation,
            price: startingPrice
    })

    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
        const fetchPrices = async () => {
            const pricesData = await getPrices();
            setDbPrices(pricesData);
        };
        fetchPrices();
    }, []);

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
        "haulAway": dbPrices?.haulAway || {
            "curb": 50,
            "inside" : 90,
            "inside-uninstalled" : 65
        },
        "install": dbPrices?.install || {
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
        const service = currentServices.service;
        const location = currentServices.location;
        const appliance = currentServices.appliance;
        if (service === "haulAway") {
            setCurrentServices((prevState) => ({
                ...prevState,
                price: prices[service][location]
            }));
        } else {
            setCurrentServices((prevState) => ({
                ...prevState,
                price: prices[service][appliance]
                
            }));
        }
    }

    const selectAppliance = (appliance) => {
        setCurrentServices((prevState) => ({
            ...prevState,
            appliance: appliance
        }));
    }

    const selectLocation = (location) => {
        setCurrentServices((prevState) => ({
            ...prevState,
            location: location
        }));
    }
    
    useEffect(() => {
        setJobInfo((prevState) => ({
            ...prevState,
            price: startingPrice
        }))
        setCurrentServices((prevState) => ({
            ...prevState,
            service: service
        }));
    }, [])

    useEffect(() => {
        setPrice();
    }, [currentServices.service, currentServices.location, currentServices.appliance, dbPrices]);
    
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
                <div className="col hide-on-md-and-down">
                    <img src={photo} alt="service-photo" width='800' height='800'/>
                </div>
                <div className="col">
                    <h1>{title}</h1>
                        <h1>${currentServices.price}</h1>
                    <hr></hr>
                    <strong>Select an appliance</strong>
                  <div className='flex flex-wrap justify-center appliance-selection-container'>
                        {dbPrices && Object.keys(dbPrices.install).map((appliance) => (
                            <button
                                key={appliance}
                                className={`btn-secondary my-1 ${currentServices.appliance === appliance ? 'selected' : ''}`}
                                onClick={() => selectAppliance(appliance)}
                            >
                                <span>{appliance.charAt(0).toUpperCase() + appliance.slice(1)}</span>
                            </button>
                        ))}
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
                    <div className="added-to-cart-modal-content">
                        <h1 className="text-center">Thanks for selecting a service</h1>
                        <p className="text-center">What would you like to do now?</p>
                        <div className="btn-container">
                            <Link to="/services" className="flex-1">
                                <button className="btn-secondary">Add another service or appliance</button>
                            </Link>
                            <Link to="/cart" className="flex-1">
                                <button>Go to Checkout</button>
                            </Link>
                            
                        </div>
                    </div>

                </div>
            ) : ''}



        </div>


    );
}
 
export default PDP;