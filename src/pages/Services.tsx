import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import installPhoto from '../images/install.jpg';
import haulPhoto from '../images/move.jpg';

const Services = () => {

    return ( 
        <div className="container flex flex-col">
            <h1 className="text-center my-5">Services</h1>
            <div className="d-flex justify-content-around flex-wrap">
                <Link to="/pdp-haulAway" className="mb-5">
                    <Card title="Haul away an appliance" subtitle="Starting at $19" image={haulPhoto} btnText="Schedule"/>
                </Link>
                <Link to="/pdp-install" className="mb-5">
                    <Card title="Install an appliance" subtitle="Starting at $49" image={installPhoto} btnText="Schedule"/>
                </Link>
            </div>
            
        </div>
        
    );
}
 
export default Services;