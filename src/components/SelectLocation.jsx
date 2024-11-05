import { useState } from "react";
import { getPositionOfLineAndCharacter } from "typescript";
import { motion, AnimatePresence } from "framer-motion";
// import prices from '../data/prices';

const SelectLocation = ({serviceVerb, setQuestionScreen, questionScreen, setCurrentJobInfo, currentJobInfo, jobNumber}) => {
    const makeSelection = () =>{
        setQuestionScreen(questionScreen+=1)
    }
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [location, setLocation] = useState("Choose a location");
    const [other, setOther] = useState(false);
    const selectOption = (loc, oth) =>{
        setLocation(loc)
        setOther(oth)
        setDropDownOpen(false);
    }

    return ( 
        <>
            <AnimatePresence>
                <motion.div initial={{ opacity: 0}} animate={{ x: [500, 0], opacity: 1}}  exit={{ opacity: 0, x: [-500, 0] }} key="SelectService">
                    <div className="flex flex-col px-24 items-center justify-center">
                        <div className="text-center mb-8">
                            <h3>Where will we be {serviceVerb} your appliance?</h3>
                            <h4>We operate within 35 miles of the St. Louis area.</h4>
                        </div>
                        <div className='flex flex-wrap w-1/2 justify-start flex-col mb-8'>
                            <div className="flex flex-col mb-8">
                                <label className="block text-gray-700 text-sm font-bold mb-b" htmlFor="address">Address</label>
                                <input placeholder="Enter your address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-slate-400 focus:shadow-outline" id="address" type="text" />
                            </div>

                            <div className="flex flex-col mb-8">
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="address">Location</label>
                                <button className="inline-flex w-full rounded border border-gray-7000 text-start bg-white px-4 py-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-100" aria-expanded="true" aria-haspopup="true" onClick={()=>setDropDownOpen(!dropDownOpen)}>{location}</button>
                                {/* <div className={`flex flex-col rounded border border-gray-700 bg-white px-4 py-2 shadow-sm ${dropDownOpen === true ? "block" : "hidden"}`}>
                                    {Object.values(prices).map((item) => (
                                        <a key={item.name} className="hover:bg-gray-100 hover:cursor-pointer p-1" onClick={() => selectOption(item.description, false)}>
                                            ${item.price} {item.description}
                                        </a>
                                    ))}
                                </div> */}
                            </div>
                            {other === true ? (
                                <div>
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please give more information about the location of your appliance.</label>
                                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                </div>
                            ):(
                                ""
                            )}
                            {serviceVerb === "delivering" || serviceVerb === "moving" ? (
                                <div className="flex flex-col mb-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-b" htmlFor="address">Location (From where?)</label>
                                    <input placeholder="Enter your address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-slate-400 focus:shadow-outline" id="address" type="text" />
                                </div>
                            ):(
                                ""
                            )}

                            {/* <p>from where if selecting delivery or move</p> */}
                        </div>
                        <button className="btn-secondary" onClick={()=>makeSelection()}>Continue</button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </> 
    );
}
 
export default SelectLocation;