import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import Service from "../components/Service";

const Schedule = () => {
    const [questionScreen, setQuestionScreen] = useState(0);
    const [ serviceVerb, setServiceVerb ] = useState("working with");
    const [ jobNumber, setJobNumber ] = useState(0);
    const [ jobInfo, setJobInfo ] = useState({
        services: [
            {
                service: "",
                appliance: "",
                location: ""
            }
        ],
        preferred_delivery_date: {
            time: "",
            day: ""
        },
        notes: "N/A",
        price: 0,
        first_name: "",
        last_name: "",
        confirmed_delivery_date: "",
        payment_collected: false,
        orderStatus: 0,
        number_of_services: 1
    });

    const serviceComponents = Array.from({ length: jobInfo.number_of_services }, (_, index) => (
        <Service key={index} index={index} jobInfo={jobInfo} setJobInfo={setJobInfo}/>
    ));


    return ( 
        <div>
            <div className="w-full flex justify-center my-16">
                {/* <ProgressBar 
                    questionScreen={questionScreen}  
                    setQuestionScreen={setQuestionScreen}  
                /> */}
            </div>
            <h1>Services</h1>
            <div className="service-components">
                {serviceComponents}
            </div>
            <h1>Scheduling</h1>
 
            
        </div>
     );
}
 
export default Schedule;