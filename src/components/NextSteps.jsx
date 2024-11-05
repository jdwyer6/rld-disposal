const Receipt = ({ jobInfo, setJobInfo }) => {
    const handleFirstNameChange = (event) => {
        setJobInfo((prevState) => ({
            ...prevState,
            first_name: event.target.value
        }));
    };

    const handleLastNameChange = (event) => {
        setJobInfo((prevState) => ({
            ...prevState,
            last_name: event.target.value
        }));
    };

    const handlePhoneChange = (event) => {
        setJobInfo((prevState) => ({
            ...prevState,
            phone: event.target.value
        }));
    };

    const handlePaymentCheckboxChange = (event) => {
        setJobInfo((prevState) => ({
            ...prevState,
            terms_of_service: {
                ...prevState.terms_of_service,
                payment: event.target.checked
            }
        }));
    };
    
    const handleServiceAreaCheckboxChange = (event) => {
        setJobInfo((prevState) => ({
            ...prevState,
            terms_of_service: {
                ...prevState.terms_of_service,
                service_area: event.target.checked
            }
        }));
    };

    return (
        <div className="container">
            <section>
                <h3>What's Next?</h3>
                <ul>
                    <li>You will receive a call from us to confirm a date and time for your selected service(s) along with your total.</li>
                    <li>Transaction details such as, address of selected service, will be collected during your fonfirmation phone call.</li>
                    <li>Payment will be collected on the day of the service.</li>
                </ul>
                
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required onChange={handleFirstNameChange} value={jobInfo.first_name} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required onChange={handleLastNameChange} value={jobInfo.last_name} />
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" placeholder="xxx-xxx-xxxx" required onChange={handlePhoneChange}/>

                <h3>One last thing...</h3>
                <b>Terms of service</b>
                <p>Please read and click the check boxes to confirm the following:</p>
                <div>
                    <div className="d-flex">
                    <input type="checkbox" id="payment" name="payment" required onChange={handlePaymentCheckboxChange} checked={jobInfo.terms_of_service.payment} />
                        <label htmlFor="payment">I understand that we only accept <b>cash</b>, <b>check</b> or <b>money order</b>.</label>
                    </div>
                    <div className="d-flex">
                        <input type="checkbox" id="service-area" name="service-area" required onChange={handleServiceAreaCheckboxChange} checked={jobInfo.terms_of_service.service_area} />
                        <label htmlFor="service-area">I understand RLD Disposal only provides service within 40 miles of <b>St Louis</b> and <b>St Louis County</b></label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Receipt;