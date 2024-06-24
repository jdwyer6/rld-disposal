import Card from '../components/card';
import {Link} from 'react-router-dom';
import installPhoto from '../images/install.png';
import haulPhoto from '../images/haulAway.png';

type servicesProps = {
    numOfCartItems: number
}

const Services = ({numOfCartItems}: servicesProps) => {

    return ( 
        <div className="container flex flex-col services-page">
            <h1 className="text-center my-5">Services</h1>
            <div className="flex justify-around flex-wrap services-container">
                <Link to="/pdp-haulAway" className="mb-5 flex-1">
                    <Card title="Haul away an appliance" subtitle="Starting at $19" image={haulPhoto} btnText="Schedule"/>
                </Link>
                <Link to="/pdp-install" className="mb-5 flex-1">
                    <Card title="Install an appliance" subtitle="Starting at $49" image={installPhoto} btnText="Schedule"/>
                </Link>
            </div>
            {numOfCartItems > 0 && (
                <Link to="/cart">
                    <button>Go To Checkout</button>
                </Link>
                
            )}
            
            
        </div>
        
    );
}
 
export default Services;