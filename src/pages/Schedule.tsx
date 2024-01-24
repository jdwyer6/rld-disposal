import SelectService from "../components/SelectService";
import SelectAppliance from "../components/SelectAppliance";
import SelectLocation from "../components/SelectLocation";
import SelectTime from "../components/SelectTime";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import Service from "../components/Service";
import Scheduling from "../components/Scheduling";
import Notes from "../components/Notes";
import Receipt from "../components/Receipt";
import NextSteps from "../components/NextSteps";
import { db } from '../config/firebase';
import { addDoc, collection } from "firebase/firestore";
import MessageModal from "../components/MessageModal";


const Schedule = () => {
    const [questionScreen, setQuestionScreen] = useState(0);
    const [ serviceVerb, setServiceVerb ] = useState("working with");
    const [ jobNumber, setJobNumber ] = useState(0);
    const jobsCollectionRef = collection(db, "jobs");
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [ modalMessage, setModalMessage ] = useState("test message");

    const openModal = (message:string) => {
        setModalMessage(message);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const [ jobInfo, setJobInfo ] = useState({
        services: [
            {
                service: "",
                appliance: "",
                location: ""
            }
        ],
        preferred_delivery_date: {
            time: "",
            day: ""
        },
        notes: "",
        price: 0,
        first_name: "",
        last_name: "",
        phone: "",
        confirmed_delivery_date: "",
        payment_collected: false,
        orderStatus: 0,
        number_of_services: 1,
        terms_of_service: {
            payment: false,
            service_area: false
        }
    });

    const initialJobInfo = {
        services: [
            {
                service: "",
                appliance: "",
                location: ""
            }
        ],
        preferred_delivery_date: {
            time: "",
            day: ""
        },
        notes: "",
        price: 0,
        first_name: "",
        last_name: "",
        phone: "",
        confirmed_delivery_date: "",
        payment_collected: false,
        orderStatus: 0,
        number_of_services: 1,
        terms_of_service: {
            payment: false,
            service_area: false
        }
    };
    

    const serviceComponents = Array.from({ length: jobInfo.number_of_services }, (_, index) => (
        <Service key={index} index={index} jobInfo={jobInfo} setJobInfo={setJobInfo}/>
    ));

    const onSubmit = async () => {
        if (!validateData()) {
            return;
        }
        try {
            await addDoc(jobsCollectionRef, jobInfo);
            setJobInfo(initialJobInfo);
            alert("Your request has been submitted. We will contact you shortly to confirm your appointment.")
            // openModal("Your request has been submitted. We will contact you shortly to confirm your appointment.");
        } catch (err) {
            console.error(err);
            alert("There was an error submitting your request. Please try again later.")
            // openModal("There was an error submitting your request. Please try again later.");
        }
    };

    const validateData = () => {
        const keys = Object.keys(jobInfo) as Array<keyof typeof jobInfo>;
    
        for (const key of keys) {
            if (key === 'notes' || key === 'confirmed_delivery_date') {
                continue;
            }
    
            if (key === 'services') {
                for (const service of jobInfo.services) {
                    if (service.service === '' || service.appliance === '' || service.location === '') {
                        alert("Please fill out all fields in services.");
                        return false;
                    }
                }
                continue;
            }
    
            if (key === 'terms_of_service') {
                if (!jobInfo.terms_of_service.payment || !jobInfo.terms_of_service.service_area) {
                    alert("Please agree to all terms of service.");
                    return false;
                }
                continue;
            }
    
            const value = jobInfo[key];
    
            if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                const subKeys = Object.keys(value) as Array<keyof typeof value>;
                for (const subKey of subKeys) {
                    if (value[subKey] === '' || value[subKey] === null) {
                        alert(`Please fill out all fields. Value missing for ${subKey}`);
                        return false;
                    }
                }
            } else if (typeof value === 'string' && (value === '' || value === null)) {
                alert(`Please fill out all fields. Value missing for ${key}`);
                return false;
            }
        }
        return true;
    }


    return ( 
        <div className="relative">
            {serviceComponents}
            <Scheduling jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <Notes jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <Receipt jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <NextSteps jobInfo={jobInfo} setJobInfo={setJobInfo}/>
            <div className="container">
                <button onClick={onSubmit}>Submit Request</button>
            </div>   
            {/* <MessageModal modalIsOpen={modalIsOpen} message={modalMessage} /> */}
        </div>
     );
}
 
export default Schedule;