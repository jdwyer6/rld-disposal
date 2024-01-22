import prices from "../data/prices";

type receiptProps = {
    jobInfo: any,
    setJobInfo: Function
}

const Receipt = ({ jobInfo, setJobInfo }: receiptProps) => {
    const MOSalesTaxRate = .4225;

    const calculateSubtotal = () => {
        let subtotal = 0;
        jobInfo.services.forEach((serviceItem: { service: keyof typeof prices; appliance?: string; location?: string; }) => {
            const serviceType = serviceItem.service; // 'remove' or 'install'
    
            let servicePrice = 0;
            if (serviceType === 'install' && serviceItem.appliance) {
                servicePrice = prices.install[serviceItem.appliance as keyof typeof prices.install];
            } else if (serviceType === 'remove' && serviceItem.location) {
                servicePrice = prices.remove[serviceItem.location as keyof typeof prices.remove];
            }
    
            subtotal += servicePrice;
        });

        console.log(subtotal)
    
        return subtotal;
    };

    const calculeateTaxes = () => {
        const subtotal = calculateSubtotal();
        const taxes = subtotal * MOSalesTaxRate;
        return taxes;
    }

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
                    <span><b>Subtotal:</b> ${calculateSubtotal()}</span>
                </div>
                <div>
                    <span><b>Taxes:</b> ${calculeateTaxes()}</span>
                </div>
                <div>
                    <span><b>Estimated Total:</b> ${Math.round((calculateSubtotal() + calculeateTaxes()) * 100) / 100}</span>
                </div>
            </section>
        </div>
    )
}

export default Receipt;