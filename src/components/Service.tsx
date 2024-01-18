import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';




type serviceProps = {
    jobInfo: any,
    setJobInfo: Function
}

const Service = ({ jobInfo, setJobInfo }: serviceProps) => {
    const appliances = ["Refrigerator", "Range", "Stove", "Oven", "Microwave", "Dishwasher", "Washer", "Dryer", "Wine Cooler", "Ice Maker", "Freezer", "Trash Compactor", "Garbage Disposal", "Vent Hood"]
    const locations = ["Garage", "Driveway or Curb", "Inside the home"]
    let isRemove = false;

    const selectService = (value: string) => {
        let updatedServices = [...jobInfo.services];
        updatedServices[0].service = value;
    
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            services: updatedServices
        }));
        
        if (value === "remove") {
            isRemove = true;
        } else {
            isRemove = false;
        }
    }

    return ( 
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <section className="text-center flex flex-col justify-center">
                    <h3>Select a service</h3>
                        <div className="btn-container">
                            <div className={`btn-round ${jobInfo.services[0].service === "remove" ? 'selected' : ''}`} onClick={()=>selectService("remove")}>
                                <button><FontAwesomeIcon className="fa-2xl" icon={faTruckFast}/></button>
                                <p>Remove</p>
                            </div>
                            <div className={`btn-round ${jobInfo.services[0].service === "install" ? 'selected' : ''}`} onClick={()=>selectService("install")}>
                                <button><FontAwesomeIcon className="fa-2xl" icon={faScrewdriverWrench} /></button>
                                <p>Install</p>
                            </div>
                        </div>

                    <h3>Select an Appliance</h3>
                    <div className="item-container">
                        {appliances.map((appliance, index) => (
                            <div key={index} className="">
                            <button className='btn-secondary'>
                                {appliance}
                            </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className={isRemove ? 'show' : 'hide'}>
                        <h2 className="text-lg mb-3">Select a location.</h2>
                        <select className="item-container">
                                {locations.map((location, index) => (
                                        <option key={index}>{location}</option>
                                ))}

                        </select>
                    </div>

                </section>
                <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        + Add another service
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Service;