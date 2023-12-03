import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";


type PrivateProps = {
    serviceVerb: string
    setQuestionScreen: any
    questionScreen: number
}

const SelectTime = ({setQuestionScreen, questionScreen, serviceVerb}: PrivateProps) => {
    const [timeAndDay, setTimeAndDay] = useState();
    const makeSelection = (verb: string) =>{
        setQuestionScreen(questionScreen+=1)
    }
    return ( 
        <>
            <AnimatePresence>
                <motion.div initial={{ opacity: 0}} animate={{ x: [500, 0], opacity: 1}}  exit={{ opacity: 0, x: [-500, 0] }} key="SelectService">
                    <div className="flex flex-col px-24 items-center justify-center">
                        <div className="text-center mb-8">
                            <h3>When should we arrive?</h3>
                            <h4>Please select a day/time.</h4>
                        </div>
                        <div className='flex flex-wrap w-full justify-center'>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Monday</h4>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Tuesday</h4>
                                <button className="btn-secondary-small">10:00 am</button>
                                <button className="btn-secondary-small">12:00pm</button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Wednesday</h4>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Thrusday</h4>
                                <button className="btn-secondary-small">10:00 am</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Friday</h4>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="mb-4">Saturday</h4>
                                <button className="btn-secondary-small">8:00 am</button>
                                <button className="btn-secondary-small">10:00 am</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                                <button className="btn-secondary-small-disabled">Unavailable</button>
                                <button className="btn-secondary-small">4:00 pm</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </> 
    );
}
 
export default SelectTime;