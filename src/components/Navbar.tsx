import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useState } from 'react';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return ( 
            <nav className="container-fluid">
                <ul>
                    <Link to='/' className="flex items-center flex-shrink-0 text-white mr-6">
                        <img src={logo} width='24' className='mr-3'/>
                        <span className="font-semibold text-xl tracking-tight brand-text">RLD Disposal</span>
                    </Link>
                </ul>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">About</a></li>
                    <li><a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">Schedule service</a></li>
                    <li><a href="#" onClick={openModal} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a></li>
                </ul>
                
                {showModal && <LoginModal onClose={closeModal} />}
            </nav>
    );
}
 
export default Navbar;