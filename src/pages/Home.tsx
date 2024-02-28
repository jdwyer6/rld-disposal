import homePhoto from '../images/home_image.jpg';
import bgApplianceImage from '../images/bg-appliances.png';
import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';

const Home = () => {

    return ( 
        <div className="relative">
            <img src={bgApplianceImage} alt="Appliances" className="bg-image" />
            <div className="container my-4">
                <div className="grid grid-flow-col">
                <div>
                    <h1>Don't know what to do with your appliances?</h1>
                    <p>Contact RLD Disposal today for quality appliance delivery, installation, removal, and more from technicians who care.</p>
                    <div className="my-2">
                    <Link to="/schedule">
                        <button className="button primary">Make an appointment</button>
                    </Link>
                    <button className="button">Learn More</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img className="responsive-image" src={homePhoto} alt="Home Appliances" />
                </div>
                </div>
            </div>

            <div className="bg-primary text-white text-center py-6">
                <h1>We address all your appliance annoyances.</h1>
                <div className="grid grid-flow-col gap-4">
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

            <div className="container my-6">
                <h2 className="text-center my-9">Serving the greater St. Louis area since 1953.</h2>
                <div className="grid grid-flow-col gap-4">
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