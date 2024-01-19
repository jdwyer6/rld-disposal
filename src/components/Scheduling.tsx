import { faMugSaucer, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Scheduling = () => {
    return ( 

    <div className="container">
        <section>
            <div>
                <h3 className="text-center">Select a time of day.</h3>
                <p className="text-center">Do you prefer for us to arrive in the morning or afternoon?</p>
                <div className="btn-container">
                    <div className={`btn-round`}>
                        <button><FontAwesomeIcon className="fa-2xl" icon={faMugSaucer}/></button>
                        <p>Morning</p>
                    </div>
                    <div className={`btn-round`}>
                        <button><FontAwesomeIcon className="fa-2xl" icon={faSun} /></button>
                        <p>Afternoon</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-center">Select a day.</h3>
                <p className="text-center">Which day works best with your schedule?</p>
                <div className="item-container">
                    <div><button className={`btn-secondary`} >Monday</button></div>
                    
                    <div><button className={`btn-secondary`} >Tuesday</button></div>
                    <div><button className={`btn-secondary`} >Wednesday</button></div>
                    <div><button className={`btn-secondary`} >Thursday</button></div>
                    <div><button className={`btn-secondary`} >Friday</button></div>
                    <div><button className={`btn-secondary`} >Saturday</button></div>
             
                </div>
            </div>
   

        </section>
    </div>

     );
}
 
export default Scheduling;