import { isVisible } from "@testing-library/user-event/dist/utils"
import { motion, AnimatePresence } from "framer-motion"

const SelectService = ({setQuestionScreen, questionScreen, setServiceVerb, setCurrentJobInfo, currentJobInfo, jobNumber}) => {
    const makeSelection = (verb, service) => {
        let updatedJob = [...currentJobInfo.services];
        updatedJob[jobNumber] = service;
        setCurrentJobInfo({
            ...currentJobInfo,
            services: updatedJob
        });
        setQuestionScreen(questionScreen+=1)
        setServiceVerb(verb)
    }

    return ( 
        <AnimatePresence>
            <motion.div initial={{ opacity: 0}} animate={{ x: [500, 0], opacity: 1}}  exit={{ opacity: 0, x: [-500, 0] }} key="SelectService">
                <div className="flex flex-col px-24 items-center justify-center">
                    <div className="text-center mb-8">
                        <h3>What would you like to schedule?</h3>
                        <h4>Choose one option (you can add more later).</h4>
                    </div>
                    <div className='flex flex-wrap w-3/4 justify-center'>
                        <button onClick={()=>makeSelection("picking up", "pickup")} className='btn-secondary my-3'>
                            <h5>Pick up</h5>
                            <p>Haul away an old appliance.</p>
                        </button>
                        <button onClick={()=>makeSelection("delivering", "deliver")} className='btn-secondary my-3'>
                            <h5>Deliver</h5>
                            <p>From retailer or other location.</p>
                        </button>
                        <button onClick={()=>makeSelection("installing", "install")} className='btn-secondary my-3'>
                            <h5>Install</h5>
                            <p>Installation of any major appliance.</p>
                        </button>
                        <button onClick={()=>makeSelection("moving", "move")} className='btn-secondary my-3'>
                            <h5>Move</h5>
                            <p>Appliance to new residence.</p>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence> 
    );
}
 
export default SelectService;