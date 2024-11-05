import emailjs from '@emailjs/browser';
import { useRef, MutableRefObject } from 'react';

const SendConfirmationEmail = ({templateId, firstName, email, price, jobInfo}) => {
    const serviceID = process.env.REACT_APP_EMAIL_SERVICE_ID || '';
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY || '';

    const templateParams = {
        to_name: firstName,
        to_email: email,
        price: price,
        jobInfo: JSON.stringify(jobInfo)
    };

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