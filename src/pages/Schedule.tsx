import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import { useState } from "react";

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
        />
    ];

    return ( 
        <>

                {questionnaire[questionScreen]}
      
            

        </>
     );
}
 
export default Schedule;