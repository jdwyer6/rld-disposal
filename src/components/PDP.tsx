import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { start } from 'repl';

type pdpProps = {
    title: string,
    photo: string,
    startingPrice: number,
    jobInfo: any,
    setJobInfo: any,
    service: string,
    showApplianceLocationDropdown: boolean
}

const PDP = ({title, photo, startingPrice, jobInfo, setJobInfo, service, showApplianceLocationDropdown}: pdpProps) => {

    const [currentServices, setCurrentServices] = useState({
            service: "",
            appliance: "",
            location: ""
    })

    console.log(currentServices)

    const appliances = ["Refrigerator", "Range", "Stove", "Oven", "Microwave", "Dishwasher", "Washer", "Dryer", "Wine Cooler", "Ice Maker", "Freezer", "Trash Compactor", "Garbage Disposal", "Vent Hood"]
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
            "refrigerator": 50,
            "range": 50,
            "washer": 50,
            "dryer": 50,
            "dishwasher": 50,
            "cooktop": 50,
            "microwave": 50
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


    return ( 
        <div className="container">
            <div className='row mt-5'>
                <div className="col">
                    <img src={photo} alt="service-photo" width='800' height='800'/>
                </div>
                <div className="col ms-5">
                    <h1>{title}</h1>
                        <h1>${jobInfo.price}</h1>
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

                    <button>Add to Cart</button>
                </div>
                
            </div>

        </div>


    );
}
 
export default PDP;