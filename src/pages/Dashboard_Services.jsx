import { Link } from 'react-router-dom';
import { getPrices, savePrices } from '../services/adminPrefsService';
import { useEffect, useState } from 'react';
import DashboardNav from '../components/dashboardNav';

const Dashboard_Services = () => {
    const [prices, setPrices] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            const pricesData = await getPrices();
            setPrices(pricesData);
        };

        fetchPrices();
    }, []);

    const handleInputChange = (category, key, value) => {
        setPrices((prevPrices) => {
            if (prevPrices && prevPrices[category]) {
                return {
                    ...prevPrices,
                    [category]: {
                        ...prevPrices[category],
                        [key]: parseFloat(value)
                    }
                };
            } else if (prevPrices) {
                // Handle case where category does not exist yet
                return {
                    ...prevPrices,
                    [category]: {
                        [key]: parseFloat(value)
                    }
                };
            }
            return prevPrices;
        });
    };

    const handleSave = async () => {
        if (prices) {
            try {
                await savePrices(prices); // Ensure this function is defined in adminPrefsService
                alert('Prices updated successfully!');
            } catch (error) {
                console.error('Error saving prices:', error);
                alert('Failed to update prices.');
            }
        }
    };

    function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div className="container flex align-top my-md">

            <div className="flex-1 dashboard-left-nav">
                <DashboardNav />
            </div>
            <div className="flex-6 relative">
                <h1>Service Pricing</h1>
                {prices ? (
                    <div>
                        {Object.entries(prices).map(([category, items]) => (
                            <div key={category} className="my-lg">
                                <h3>{capFirst(category)}</h3>
                                {Object.entries(items).map(([key, value]) => (
                                    <div key={key} className="mb-3">
                                        <label htmlFor={`${category}-${key}`}>
                                            {capFirst(key)}
                                        </label>
                                        <input
                                            type="number"
                                            id={`${category}-${key}`}
                                            value={value}
                                            onChange={(e) =>
                                                handleInputChange(category, key, e.target.value)
                                            }
                                            className="form-control"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button onClick={handleSave} className="my-sm">Save</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}  
            </div>
            
        </div>
    );
};

export default Dashboard_Services;
