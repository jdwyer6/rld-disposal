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
        orderStatus: 0
    });

    // const questionnaire = [
    //     <SelectService 
    //         setQuestionScreen={setQuestionScreen} 
    //         questionScreen={questionScreen}
    //         setServiceVerb={setServiceVerb}
    //         setCurrentJobInfo={setCurrentJobInfo}
    //         currentJobInfo={currentJobInfo}
    //         jobNumber={jobNumber}
    //     />, 
    //     <SelectAppliance 
    //         serviceVerb={serviceVerb}
    //         setQuestionScreen={setQuestionScreen} 
    //         questionScreen={questionScreen}    
    //         setCurrentJobInfo={setCurrentJobInfo}
    //         currentJobInfo={currentJobInfo}
    //         jobNumber={jobNumber}

    //     />, 
    //     <SelectLocation 
    //         serviceVerb={serviceVerb}
    //         setQuestionScreen={setQuestionScreen} 
    //         questionScreen={questionScreen}   
    //         setCurrentJobInfo={setCurrentJobInfo}
    //         currentJobInfo={currentJobInfo}
    //         jobNumber={jobNumber}

    //     />,
    //     <SelectTime 
    //         serviceVerb={serviceVerb}
    //         setQuestionScreen={setQuestionScreen} 
    //         questionScreen={questionScreen}   
    //         setCurrentJobInfo={setCurrentJobInfo}
    //         currentJobInfo={currentJobInfo}
    //         jobNumber={jobNumber}

    //     />
    // ];

    return ( 
        <div>
            <div className="w-full flex justify-center my-16">
                {/* <ProgressBar 
                    questionScreen={questionScreen}  
                    setQuestionScreen={setQuestionScreen}  
                /> */}
            </div>
            <h1>Services</h1>
            <div>
                <Service jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            </div>
            <h1>Scheduling</h1>
 
            
        </div>
     );
}
 
export default Schedule;