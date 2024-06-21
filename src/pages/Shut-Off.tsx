import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from '../components/dashboardNav';
import { db } from '../config/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

const ShutOff = () => {
    // State to manage toggle
    const [isToggled, setIsToggled] = useState(false);
    const adminPrefsDoc = process.env.REACT_APP_ADMIN_PREFS_DOC || "defaultDocId";

    const toggle = async () => {
        const newToggleState = !isToggled;
        setIsToggled(newToggleState);

        const docRef = doc(db, "admin_prefs", adminPrefsDoc);
        try {
            await updateDoc(docRef, {
                emergency_shut_off: newToggleState
            });
            const toggleMessage = newToggleState ? "OFF" : "ON";
            alert(`Admin Prefs Successfully Updated. Your site is now ${toggleMessage}.`);
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error updating document. Please try again.");
        }
    };

    useEffect(() => {
        const fetchToggleState = async () => {
            const docRef = doc(db, "admin_prefs", adminPrefsDoc);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsToggled(docSnap.data().emergency_shut_off);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchToggleState();
    }, [adminPrefsDoc]);

    return (
        <>
            <div className="container flex align-top my-md">
                <div className="flex-1 dashboard-left-nav">
                    <DashboardNav />
                </div>
                <div className="flex-6">
                    <h1 className="text-center">Emergency Site Shut Off</h1>
                    <p className="text-center">This button will temporarily turn off the website and replace it with a friendly message about temporarily not having availability. It can be used if you are getting too many orders to keep up with.</p>
                    <button onClick={toggle} className={`btn ${isToggled ? 'btn-danger' : 'btn-success'}`}>
                        {isToggled ? 'Turn Site Back On' : 'Turn Off Site'}
                    </button>
                    {isToggled && (
                        <div>
                            <strong>The site is currently OFF.</strong>
                        </div>
                    )}
                    {!isToggled && (
                        <strong>The site is currently ON.</strong>
                    )}
                </div>
            </div>
        </>
    );
}

export default ShutOff;