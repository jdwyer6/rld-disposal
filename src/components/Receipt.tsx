import prices from "../data/prices";

type receiptProps = {
    jobInfo: any,
    setJobInfo: Function
}

const Receipt = ({ jobInfo, setJobInfo }: receiptProps) => {
    const MOSalesTaxRate = .4225;

    const calculateSubtotal = () => {
        let subtotal = 0
    
        jobInfo.services.forEach((serviceItem: any) => {
            let service = serviceItem.service;
            let appliance = serviceItem.appliance;
            let location = serviceItem.location;

            let price = prices[serviceItem.service];
            console.log(prices[serviceItem.service])

        });
    
        return subtotal;
    };

    calculateSubtotal();

    return (
        <div className="container">
            <section>
                <h3>Receipt</h3>
                <b>Services ordered: </b>
                <ul>
                    {jobInfo.services.map((serviceItem: any, index: number) => (
                        <li key={index}>
                            {serviceItem.service.charAt(0).toUpperCase() + serviceItem.service.slice(1)} {serviceItem.appliance}
                            {serviceItem.location && ` from ${serviceItem.location}`}
                        </li>
                    ))}
                </ul>
                <b>Preferred day and time of day:</b>
                <ul>
                    <p>{jobInfo.preferred_delivery_date.day.charAt(0).toUpperCase() + jobInfo.preferred_delivery_date.day.slice(1)} during the {jobInfo.preferred_delivery_date.time}</p>
                </ul>
                <div>
                    <span><b>Subtotal:</b> $84.45</span>
                </div>
                <div>
                    <span><b>Taxes:</b> $12.45</span>
                </div>
                <div>
                    <span><b>Estimated Total:</b> $12.45</span>
                </div>
            </section>
        </div>
    )
}

export default Receipt;