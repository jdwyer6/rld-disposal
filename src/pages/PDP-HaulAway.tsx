import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import PDP from '../components/PDP';
import haulPhoto from '../images/move.jpg';

const PDPHaulAway = () => {

    return ( 
        <div className="container">
            <PDP title="Haul Away an Appliance" photo={haulPhoto}/>
  
        </div>
        
    );
}
 
export default PDPHaulAway;