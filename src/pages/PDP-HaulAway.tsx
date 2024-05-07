import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import PDP from '../components/PDP';
import haulPhoto from '../images/move.jpg';

type pdpProps = {
    jobInfo: any,
    setJobInfo: any
}


const PDPHaulAway = ({jobInfo, setJobInfo}: pdpProps) => {

    return ( 
        <div className="container">
            <PDP title="Haul Away an Appliance" photo={haulPhoto} startingPrice={19} jobInfo={jobInfo} setJobInfo={setJobInfo} service={"haulAway"} showApplianceLocationDropdown={true}/>
  
        </div>
        
    );
}
 
export default PDPHaulAway;