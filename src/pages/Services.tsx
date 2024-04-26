import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import installPhoto from '../images/install.jpg';
import movePhoto from '../images/move.jpg';

const Services = () => {

    return ( 
        <div className="flex flex-col">
            <h1 className="text-center">Services</h1>
            <div>
            <Card title="Haul away an appliance" subtitle="Starting at $19" image={movePhoto} btnText="Schedule"/>
            <Card title="Install an appliance" subtitle="Starting at $49" image={installPhoto} btnText="Schedule"/>
            </div>
            
        </div>
        
    );
}
 
export default Services;