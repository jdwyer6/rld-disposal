import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './input.css';
import Home from './pages/Home';
import Services from './pages/Services';
import Navigation from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './pages/Schedule';
import PDPHaulAway from './pages/PDP-HaulAway';
import PDPInstall from './pages/PDP-Install';
import Dashboard_Home from './pages/Dashboard_Home';
import Dashboard_Calendar from './pages/Dashboard_Calendar';
import ThankYou from './pages/Thank-You';
import ShutOff from './pages/Shut-Off';
import Dashboard_Services from './pages/Dashboard_Services';
import Dashboard_Create from './pages/Dashboard_Create';
import Cart from './pages/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [ jobInfo, setJobInfo ] = useState({
    services: [
        // {
        //     service: "",
        //     appliance: "",
        //     location: ""
        // }
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

  const [ numOfCartItems, setNumOfCartItems ] = useState(0);

  return (
    <div className="App relative">
      <BrowserRouter>
        <Navigation  numOfCartItems={numOfCartItems} setNumOfCartItems={setNumOfCartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services numOfCartItems={numOfCartItems} />} />
          <Route path="/pdp-haulAway" element={<PDPHaulAway jobInfo={jobInfo} setJobInfo={setJobInfo} setNumOfCartItems={setNumOfCartItems}/>} />
          <Route path="/pdp-install" element={<PDPInstall jobInfo={jobInfo} setJobInfo={setJobInfo} setNumOfCartItems={setNumOfCartItems}/>} />
          <Route path="/cart" element={<Cart setNumOfCartItems={setNumOfCartItems} />} />
          <Route path="/schedule" element={<Schedule />}/>
          <Route path="/thankyou" element={<ThankYou />} />
          {/* <Route path="/admin" element={<Dashboard_Home />} /> */}
          <Route path="/admin/calendar" element={<Dashboard_Calendar />} />
          <Route path="/admin/shutoff" element={<ShutOff />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard_Home /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><Dashboard_Services /></ProtectedRoute>} />
          <Route path="/admin/create" element={<ProtectedRoute><Dashboard_Create /></ProtectedRoute>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
