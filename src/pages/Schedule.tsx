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
    console.log(questionScreen)
    const questionnaire = [
        <SelectService 
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}
            setServiceVerb={setServiceVerb}
        />, 
        <SelectAppliance 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}    
        />, 
        <SelectLocation 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}   
        />,
        <SelectTime 
            serviceVerb={serviceVerb}
            setQuestionScreen={setQuestionScreen} 
            questionScreen={questionScreen}   
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