import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from "framer-motion";




type serviceProps = {
    jobInfo: any,
    setJobInfo: Function
    index: number
}

const Service = ({ jobInfo, setJobInfo, index }: serviceProps) => {
    const appliances = ["Refrigerator", "Range", "Stove", "Oven", "Microwave", "Dishwasher", "Washer", "Dryer", "Wine Cooler", "Ice Maker", "Freezer", "Trash Compactor", "Garbage Disposal", "Vent Hood"]
    const locations = ["Garage", "Driveway or Curb", "Inside the home"]
    const [isRemove, setIsRemove] = useState(true);
    const currentService = jobInfo.services[index] || { service: '', appliance: '', location: '' };
    const isServiceRemove = currentService.service === "remove";
    const [buttonHideClass, setButtonHideClass] = useState("show");

    const selectService = (value: string) => {
        let updatedServices = [...jobInfo.services];
        updatedServices[index].service = value;
    
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            services: updatedServices
        }));
        
        if (value === "remove") {
            setIsRemove(true);
        } else {
            setIsRemove(false);
        }
    }

    const selectAppliance = (appliance: string) => {
        let updatedServices = [...jobInfo.services];
        updatedServices[index].appliance = appliance;
    
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            services: updatedServices
        }));
    }

    const selectLocation = (location: string) => {
        let updatedServices = [...jobInfo.services];
        updatedServices[index].location = location;
    
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            services: updatedServices
        }));
    }

    const addAnotherService = () => {
        setJobInfo((prevState: typeof jobInfo) => {
            const newNumberOfServices = prevState.number_of_services + 1;
            
            // Create a new service object
            const newService = {
                service: "",
                appliance: "",
                location: ""
            };

            return {
                ...prevState,
                services: [...prevState.services, newService],
                number_of_services: newNumberOfServices
            };
        });

        jobInfo.number_of_services === index ? setButtonHideClass("show") : setButtonHideClass("hide")
        console.log(jobInfo.number_of_services + 1)
    }

    const removeService = () => {
        setJobInfo((prevState: typeof jobInfo) => {
            const newNumberOfServices = prevState.number_of_services - 1;
            const updatedServices = [...prevState.services];
            updatedServices.splice(index, 1);

            return {
                ...prevState,
                services: updatedServices,
                number_of_services: newNumberOfServices
            };
        });

        console.log(jobInfo)
    }


    return ( 
        <div className="container" data-index={index}>
            <div className="">
                <section className="text-center flex flex-col justify-center">
                    <h3>Select a service</h3>
                        <div className="btn-container">
                            <div className={`btn-round ${currentService.service === "remove" ? 'selected' : ''}`} onClick={()=>selectService("remove")}>
                                <button><FontAwesomeIcon className="fa-2xl" icon={faTruckFast}/></button>
                                <p>Remove</p>
                            </div>
                            <div className={`btn-round ${currentService.service === "install" ? 'selected' : ''}`} onClick={()=>selectService("install")}>
                                <button><FontAwesomeIcon className="fa-2xl" icon={faScrewdriverWrench} /></button>
                                <p>Install</p>
                            </div>
                        </div>

                    <h3>Select an Appliance</h3>
                    <div className="item-container">
                        {appliances.map((appliance, applianceIndex) => (
                            <div key={applianceIndex} className="">
                                <button 
                                    className={`btn-secondary ${currentService.appliance === appliance.toLowerCase() ? 'selected' : ''}`} 
                                    onClick={() => selectAppliance(appliance.toLowerCase())}
                                >
                                    {appliance}
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <AnimatePresence>
                        {isRemove && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h2 className="text-lg mb-3">Select a location.</h2>
                                <select className="item-container" onChange={(e)=>selectLocation(e.target.value)}>
                                    {locations.map((location, locationIndex) => (
                                        <option 
                                            key={locationIndex} 
                                            value={location.toLowerCase()} 
                                            className={`${currentService.location === location.toLowerCase() ? 'selected' : ''}`}
                                >
                                            {location}
                                        </option> ))}
                                </select>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </section>
                <div className={buttonHideClass}>
                    <button onClick={addAnotherService} className="add-another-service-btn">
                        + Add another service
                    </button>
                </div>
            </div>
            {
                jobInfo.number_of_services > 1 && (
                    <div onClick={removeService}>
                        <FontAwesomeIcon icon={faCircleXmark} className="close-icon fa-2xl"/>
                    </div>
                )
            }
   
            <div>
                
            </div>
            
        </div>
    );
}
 
export default Service;