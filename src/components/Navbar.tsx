import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BsCart4 } from "react-icons/bs";
import { getSessionService } from '../services/sessionService';

type cartProps = {
    jobInfo: any
}


const Navigation = ({jobInfo}: cartProps) => {
    const [showModal, setShowModal] = useState(false);
    const servicesData = sessionStorage.getItem('services');
    const [services, setServices] = useState(JSON.parse(servicesData ? servicesData : '[]'));

    // useEffect(() => {
    //     setServices(getSessionService('services').services || []);
    // }, [services]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return ( 
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <div className="container d-flex">
                    <Navbar.Brand href="/" className="me-5 d-flex align-center">
                        <img src={logo} width='36' className='mr-3'/>
                        <h5 className="ms-2 mb-0">RLD Disposal</h5>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" className="me-2 shadow-none">Home</Nav.Link>
                            <Nav.Link href="/about" className="me-2 shadow-none">About</Nav.Link>
                            <Nav.Link href="/services" className="me-2 shadow-none">Schedule</Nav.Link>
                            <Nav.Link href="/cart" className="nav-cart-container me-2 shadow-none" onClick={openModal}>
                                <BsCart4 />
                                <div className="cart-num">{services.length > 0 ? services.length : ''}</div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>

            </Navbar>
                
            {showModal && <LoginModal onClose={closeModal} />}
        </>


    );
}
 
export default Navigation;