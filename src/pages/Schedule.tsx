import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

const Schedule = () => {
    const [questionScreen, setQuestionScreen] = useState(0);
    const [ serviceVerb, setServiceVerb ] = useState("working with");
    const [ jobNumber, setJobNumber ] = useState(0);
    const [ currentJobInfo, setCurrentJobInfo ] = useState({
        services: [],
        appliances: [],
        address: "",
        location_to: "",
        location_from: "",
        date: "",
        time: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        price: 0,
        paymentCollected: false,
        orderStatus: "pending",
        customerNotes: "",
        businessNotes: "",
    });

    const questionnaire = [
        <SelectService 
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}
            setServiceVerb={setServiceVerb}
            setCurrentJobInfo={setCurrentJobInfo}
            currentJobInfo={currentJobInfo}
            jobNumber={jobNumber}
        />, 
        <SelectAppliance 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}    
            setCurrentJobInfo={setCurrentJobInfo}
            currentJobInfo={currentJobInfo}
            jobNumber={jobNumber}

        />, 
        <SelectLocation 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}   
            setCurrentJobInfo={setCurrentJobInfo}
            currentJobInfo={currentJobInfo}
            jobNumber={jobNumber}

        />,
        <SelectTime 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}   
            setCurrentJobInfo={setCurrentJobInfo}
            currentJobInfo={currentJobInfo}
            jobNumber={jobNumber}

        />
    ];

    return ( 
        <div>
            <div className="w-full flex justify-center my-16">
                <ProgressBar 
                    questionScreen={questionScreen}  
                    setQuestionScreen={setQuestionScreen}  
                />
            </div>
            <div className="">
                {questionnaire[questionScreen]}
            </div>
 
            
        </div>
     );
}
 
export default Schedule;