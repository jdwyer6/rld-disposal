import {Link} from 'react-router-dom';

const ThankYou = () => {

    return ( 
        <div className="container text-center">
            <h1 className="mt-lg">Thank you for your order!</h1>
            <p>Our team will be in touch soon to verify your service details.</p>
            <Link to="/">
                <button className="btn-primary">Return to Home</button>
            </Link>

        </div>
        
    );
}
 
export default ThankYou;