import logo from '../images/logo-2.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BsCart4 } from "react-icons/bs";
import { getSessionService } from '../services/sessionService';

const Navigation = ({numOfCartItems, setNumOfCartItems}) => {
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
        <Navbar expanded={expanded} onToggle={setExpanded} className="bg-white shadow absolute z-20">
            <div className="flex px-8 w-full justify-between max-w-[1400px]">
                <Navbar.Brand href="/" className="flex align-center min-h-16 gap-2">
                    <img src={logo} width="36" className=" md:block" alt="RLD Disposal" />

                    <h5 className="flex items-center mb-0 text-2xl text-text-primary">RLD Disposal</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto flex gap-4">
                        <Nav.Link href="/" onClick={closeNav}>Home</Nav.Link>
                        <Nav.Link href="/services" onClick={closeNav}>Services</Nav.Link>
                        <Nav.Link href="/cart" className="text-text-primary relative" onClick={closeNav}>
                            <BsCart4 size={24}/>
                            <div className="absolute top-0 right-0 -translate-y-2 translate-x-2 bg-brand-primary text-white px-2 rounded">{numOfCartItems > 0 ? numOfCartItems : ''}</div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
        

        


    );
}
 
export default Navigation;