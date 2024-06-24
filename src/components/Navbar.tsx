import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BsCart4 } from "react-icons/bs";
import { getSessionService } from '../services/sessionService';

type cartProps = {
    numOfCartItems: number,
    setNumOfCartItems: any
}


const Navigation = ({numOfCartItems, setNumOfCartItems}: cartProps) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const newServices = sessionStorage.getItem('services');
        setNumOfCartItems(newServices ? JSON.parse(newServices).length : 0);
    }, [numOfCartItems]);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const closeNav = () => {
        setExpanded(false);
    };

    useEffect(() => {
        console.log(expanded)
    }, [expanded]);

    return ( 
        <>
            <Navbar expanded={expanded} onToggle={setExpanded} expand="lg" variant="dark">
                <div className="container flex nav-container">
                    <Navbar.Brand href="/" className="me-5 d-flex align-center">
                        <img src={logo} width='36' className='mr-3'/>
                        <h5 className="ms-2 mb-0">RLD Disposal</h5>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle}/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" className="me-2 shadow-none" onClick={closeNav}>Home</Nav.Link>
                            <Nav.Link href="/services" className="me-2 shadow-none" onClick={closeNav}>Services</Nav.Link>
                            <Nav.Link href="/cart" className="nav-cart-container me-2 shadow-none" onClick={closeNav}>
                                <BsCart4 />
                                <div className="cart-num">{numOfCartItems > 0 ? numOfCartItems : ''}</div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>

            </Navbar>
        </>


    );
}
 
export default Navigation;