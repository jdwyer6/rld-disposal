import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import Service from "../components/Service";
import Scheduling from "../components/Scheduling";
import Notes from "../components/Notes";
import Receipt from "../components/Receipt";
import NextSteps from "../components/NextSteps";

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
        notes: "",
        price: 0,
        first_name: "",
        last_name: "",
        phont: "",
        confirmed_delivery_date: "",
        payment_collected: false,
        orderStatus: 0,
        number_of_services: 1,
        terms_of_service: {
            payment: false,
            service_area: false
        }
    });

    const serviceComponents = Array.from({ length: jobInfo.number_of_services }, (_, index) => (
        <Service key={index} index={index} jobInfo={jobInfo} setJobInfo={setJobInfo}/>
    ));


    return ( 
        <div>
            {serviceComponents}
            <Scheduling jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <Notes jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <Receipt jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <NextSteps jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            
 
            
        </div>
     );
}
 
export default Schedule;