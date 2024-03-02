import homePhoto from '../images/kitchen.jpg';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';

const Home = () => {

    return ( 
        <div className="flex flex-col">


            <div className="hero overlay flex align-center justify-center">
                <div className="content w-50">
                    <h1 className="text-white text-center hero-text">Don't know what to do with your appliances?</h1>
                    <h4 className="text-white text-center">Contact RLD Disposal today for quality appliance delivery, installation, removal, and more from technicians who care.</h4>
                    <div className="flex justify-center">
                        <Link to="/schedule">
                            <button>Make an appointment</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center my-lg">
                <h1>We address all your appliance annoyances.</h1>
                <div className="flex justify-around">
                    <div className="text-center">
                        <TbHomeOff className="icon-large" />
                        <p>Big box stores deliver but won't install?</p>
                    </div>
                    <div className="text-center">
                        <TbTrash className="icon-large" />
                        <p>Old appliances gotta go?</p>
                    </div>
                    <div className="text-center">
                        <TbTruckDelivery className="icon-large" />
                        <p>Bought an appliance but have no one to deliver?</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-center">Serving the greater St. Louis area since 1953.</h2>
                <div className="flex justify-around">
                    <Card
                        title="Schedule an appointment online"
                        subtitle="Fast, easy and convenient. Pick a time that's right for you and pay online or in-person."
                        image={cardSchedule}
                        btnText="Get started"
                    />
                    <Card
                        title="Decades of dedication and experience."
                        subtitle="With over 70 years of satisfied customers, we guarantee you are getting the best service around."
                        image={cardLearnMore}
                        btnText="Learn more"
                    />
                </div>
    
            </div>
  
        </div>
        
    );
}
 
export default Home;