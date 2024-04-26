import logo from '../images/logo-white.png';
import {Link} from 'react-router-dom';
import LoginModal from './login_Modal';
import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

type pdpProps = {
    title: string,
    photo: string
}


const PDP = ({title, photo}: pdpProps) => {

    const [currentServices, setCurrentServices] = useState([])

    return ( 
        <div className="container">
            <div className='row mt-5'>
                <div className="col">
                    <img src={photo} alt="service-photo" width='800' height='800'/>
                </div>
                <div className="col ms-5">
                    <h1>{title}</h1>

                </div>
            </div>

        </div>


    );
}
 
export default PDP;