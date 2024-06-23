import emailjs from '@emailjs/browser';
import { useRef, MutableRefObject } from 'react';

interface EmailProps {
    templateId: string;
    firstName: string;
    email: string;
    price: string;
}

const SendConfirmationEmail = ({templateId, firstName, email, price}: EmailProps) => {
    const serviceID = process.env.REACT_APP_EMAIL_SERVICE_ID || '';
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY || '';

    const templateParams = {
        to_name: firstName,
        to_email: email,
        price: price
    };

    console.log("templateParams: ", templateParams)

    emailjs.send(serviceID, templateId, templateParams, publicKey)
        .then(
            () => {
                console.log('EMAIL SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error.text);
            }
        );
};

export { SendConfirmationEmail }