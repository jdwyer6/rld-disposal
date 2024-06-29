import Card from '../components/card';
import {Link} from 'react-router-dom';
import installPhoto from '../images/install.png';
import haulPhoto from '../images/haulAway.png';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

type servicesProps = {
    numOfCartItems: number
}

const Services = ({numOfCartItems}: servicesProps) => {
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
        <div className="container flex flex-col services-page">
            <h1 className="text-center my-5">Services</h1>
            <p className="text-center">*Service available within 40 miles of St. Louis and St. Louis County.</p>
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