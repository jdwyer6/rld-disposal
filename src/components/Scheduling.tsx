import { faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip'

type schedulingProps = {
    jobInfo: any,
    setJobInfo: Function
}

const Scheduling = ({ jobInfo, setJobInfo }: schedulingProps) => {

    const selectTime = (time: string) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            preferred_delivery_date: {
                ...prevState.preferred_delivery_date,
                time: time
            }
        }));
    }

    const selectDay = (day: string) => {
        setJobInfo((prevState: typeof jobInfo) => ({
            ...prevState,
            preferred_delivery_date: {
                ...prevState.preferred_delivery_date,
                day: day
            }
        }));
    }

    return ( 

    <div className="container">
        <section>
            <div>
                <h3 className="text-center">Select a time of day.</h3>
                <p className="text-center">Do you prefer for us to arrive in the morning or afternoon?</p>
                <div className="btn-container">
                    <div className={`btn-round ${jobInfo.preferred_delivery_date.time === "morning" ? 'selected' : ''}`} onClick={()=>selectTime("morning")}>
                        <button
                            data-tooltip-id="morning-tooltip"
                            data-tooltip-content="9:00 am - 12:00 pm"
                            data-tooltip-place="top"
                        ><FontAwesomeIcon className="fa-2xl" icon={faMugSaucer}/></button>
                        <Tooltip id="morning-tooltip" />
                        <p>Morning</p>
                    </div>
                    <div className={`btn-round ${jobInfo.preferred_delivery_date.time === "afternoon" ? 'selected' : ''}`} onClick={()=>selectTime("afternoon")}>
                        <button
                            data-tooltip-id="afternoon-tooltip"
                            data-tooltip-content="1:30 pm - 4:30 pm"
                            data-tooltip-place="top"
                        ><FontAwesomeIcon className="fa-2xl" icon={faSun} /></button>
                        <Tooltip id="afternoon-tooltip" />
                        <p>Afternoon</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-center">Select a day.</h3>
                <p className="text-center">Which day works best with your schedule?</p>
                <div className="item-container">
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "monday" ? 'selected' : ''}`} onClick={()=>selectDay("monday")}>Monday</button></div>
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "tuesday" ? 'selected' : ''}`} onClick={()=>selectDay("tuesday")}>Tuesday</button></div>
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "wednesday" ? 'selected' : ''}`} onClick={()=>selectDay("wednesday")}>Wednesday</button></div>
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "thursday" ? 'selected' : ''}`} onClick={()=>selectDay("thursday")}>Thursday</button></div>
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "friday" ? 'selected' : ''}`} onClick={()=>selectDay("friday")}>Friday</button></div>
                    <div><button className={`btn-secondary ${jobInfo.preferred_delivery_date.day === "saturday" ? 'selected' : ''}`} onClick={()=>selectDay("saturday")}>Saturday</button></div>
             
                </div>
            </div>
   

        </section>
    </div>

     );
}
 
export default Scheduling;