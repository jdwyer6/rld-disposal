import cardSchedule from '../images/cardSchedule.jpg';
import cardLearnMore from '../images/cardLearnMore.jpg';
import {TbHomeOff, TbTrash, TbTruckDelivery} from 'react-icons/tb';
import Card from '../components/card';
import {Link} from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


const Home = () => {
    const [isSiteOff, setIsSiteOff] = useState(false);
    async function fetchEmergencyShutOff() {
        // Ensure the environment variable is defined
        const docId = process.env.REACT_APP_ADMIN_PREFS_DOC;
        if (!docId) {
          console.error("The document ID is not defined in environment variables.");
          return;
        }
      
        const docRef = doc(db, "admin_prefs", docId); 
        try {
          const docSnap = await getDoc(docRef); 
      
          if (docSnap.exists()) {
            const data = docSnap.data(); 
            const emergencyShutOff = data.emergency_shut_off; 
            setIsSiteOff(emergencyShutOff);
          } else {
            console.log("No such document!"); 
          }
        } catch (error) {
          console.error("Error fetching document:", error); 
        }
    }

    useEffect(() => {
        fetchEmergencyShutOff();
    }, []); 

    if (isSiteOff) {
        return (
            <div className="container flex justify-center">
                <p className="text-center my-lg">Apologies for the inconvenience! Our services are receiving an unusually high volume of requests and we do not currently have availability. Please check back later.</p>
            </div>
        ); 
    }

    return ( 
        <div className="flex flex-col home-page">
            <div className="hero overlay flex align-center justify-center">
                <div className="content hero-container">
                    <h1 className="text-white text-center hero-text">Don't know what to do with your appliances?</h1>
                    <h4 className="text-white text-center">Contact RLD Disposal today for quality appliance delivery, installation, removal, and more from technicians who care.</h4>
                    <div className="flex justify-center">
                        <Link to="/services">
                            <button>Make an appointment</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center my-lg">
                <h1>We address all your appliance annoyances.</h1>
                <div className="flex justify-around wrap">
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

            <div className="p-mobile">
                <h2 className="text-center mb-sm">Serving the greater St. Louis area since 1953.</h2>
                <div className="flex justify-around card-container">
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