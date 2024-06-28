import { Link } from 'react-router-dom';
import DashboardNav from '../components/dashboardNav';
import { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

type Service = {
  location: string;
  service: string;
  price: number;
  appliance: string;
};

type JobInfo = {
  confirmed_delivery_date: string;
  requestSeen: boolean;
  services: Service[];
  createdAt: any; // Use firebase.firestore.Timestamp if using Firebase v8
  number_of_services: number;
  notes: string;
  first_name: string;
  last_name: string;
  phone: string;
  payment_collected: boolean;
  terms_of_service: {
    payment: boolean;
    service_area: boolean;
  };
  price: number;
  preferred_delivery_date: {
    time: string;
    day: string;
  };
  orderStatus: number;
  email: string;
  id: string;
};

const Dashboard_Create = () => {
  const [jobInfo, setJobInfo] = useState<JobInfo>({
    confirmed_delivery_date: "",
    requestSeen: false,
    services: [
      {
        location: "",
        service: "install",
        price: 0,
        appliance: ""
      }
    ],
    createdAt: serverTimestamp(),
    number_of_services: 1,
    notes: "",
    first_name: "",
    last_name: "",
    phone: "",
    payment_collected: false,
    terms_of_service: {
      payment: false,
      service_area: false
    },
    price: 0,
    preferred_delivery_date: {
      time: "",
      day: ""
    },
    orderStatus: 0,
    email: "",
    id: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setJobInfo(prevState => ({
        ...prevState,
        [name]: checked
      }));
    } else if (type === 'number') {
      setJobInfo(prevState => ({
        ...prevState,
        [name]: parseFloat(value)
      }));
    } else {
      setJobInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedServices = [...jobInfo.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [name]: name === "price" ? parseFloat(value) : value
    };
    setJobInfo(prevState => ({
      ...prevState,
      services: updatedServices
    }));
  };

  const addService = () => {
    setJobInfo(prevState => ({
      ...prevState,
      services: [...prevState.services, { location: "", service: "install", price: 0, appliance: "" }]
    }));
  };

  const removeService = (index: number) => {
    const updatedServices = jobInfo.services.filter((_, i) => i !== index);
    setJobInfo(prevState => ({
      ...prevState,
      services: updatedServices
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "jobs"), jobInfo);
      alert(`Job created with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex container my-md">
      <div className="flex-1 dashboard-left-nav">
        <DashboardNav />
      </div>
      <div className="flex-6">
        <h1>Create Job</h1>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="first_name" value={jobInfo.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={jobInfo.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={jobInfo.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={jobInfo.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirmed Delivery Date:</label>
          <input type="date" name="confirmed_delivery_date" value={jobInfo.confirmed_delivery_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Notes:</label>
          <textarea name="notes" value={jobInfo.notes} onChange={handleChange}></textarea>
        </div>
        <div className="form-group my-sm">
          <label>Order Status:</label>
          <select name="orderStatus" value={jobInfo.orderStatus} onChange={handleChange}>
            <option value={0}>Pending</option>
            <option value={1}>Accepted</option>
            <option value={2}>Delivered</option>
            <option value={3}>Complete</option>
          </select>
        </div>
        <div className="form-group mb-sm">
          <label className="mr-sm">Payment Collected:</label>
          <input type="checkbox" name="payment_collected" checked={jobInfo.payment_collected} onChange={handleChange} />
        </div>
        <div className="form-group mb-sm">
            <label>Price:</label>
            <input type="number" name="price" value={jobInfo.price} onChange={handleChange} />
        </div>
        {jobInfo.services.map((service, index) => (
          <div key={index}>
            <h3>Service {index + 1}</h3>
            <div className="form-group">
              <label>Service:</label>
              <select name="service" value={service.service} onChange={(e) => handleServiceChange(index, e)}>
                <option value="haulAway">Haul Away</option>
                <option value="install">Install</option>
              </select>
            </div>
            <div className="form-group">
              <label>Appliance:</label>
              <input type="text" name="appliance" value={service.appliance} onChange={(e) => handleServiceChange(index, e)} />
            </div>
            {service.service === "haulAway" && (
                <div className="form-group">
              <label>Location:</label>
              <select name="location" value={service.location} onChange={(e) => handleServiceChange(index, e)}>
                <option value="curb">Curb</option>
                <option value="inside">Inside</option>
                <option value="inside-uninstalled">Inside Uninstalled</option>
              </select>
            </div>
            )}
            <button onClick={() => removeService(index)} className="mb-sm btn-secondary">Remove Service <FontAwesomeIcon icon={faArrowUp} /></button>
          </div>
        ))}
        <button onClick={addService} className="mb-sm btn-secondary">Add Service</button>
        <button onClick={handleSave} className="mb-sm">Save Job</button>
      </div>
    </div>
  );
}

export default Dashboard_Create;
