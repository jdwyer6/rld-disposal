import { MotionConfig } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

type PrivateProps = {
    serviceVerb: string;
    setQuestionScreen: any
    questionScreen: number
}

const SelectAppliance = ({serviceVerb, setQuestionScreen, questionScreen}: PrivateProps) => {
    const makeSelection = () =>{
        setQuestionScreen(questionScreen+=1)
    }
    return ( 
        <>
            <AnimatePresence>
                <motion.div initial={{ opacity: 0}} animate={{ x: [500, 0], opacity: 1}}  exit={{ opacity: 0, x: [-500, 0] }} key="SelectService">
                    <div className="flex flex-col px-24 items-center justify-center">
                        <div className="text-center mb-8">
                            <h3>What are we {serviceVerb}?</h3>
                            <h4>Choose one option (you can add more later).</h4>
                        </div>
                        <div className='flex flex-wrap w-1/2 justify-center'>

                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Refrigerator</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Range</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Washer</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Dryer</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Dishwasher</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Cooktop</h5>
                            </button>
                            <button className='btn-secondary my-3' onClick={()=>makeSelection()}>
                                <h5>Microwave</h5>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </> 
    );
}
 
export default SelectAppliance;