import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { db } from '../config/firebase';
import { getDoc, getDocs, collection, Timestamp, doc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import DashboardNav from "../components/dashboardNav";
import { getPrices } from "../services/adminPrefsService";

type Job = {
    id: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    createdAt?: Timestamp;
    orderStatus?: number;
    payment_collected?: boolean; 
    services?: Array<{ service: string, appliance: string, location: string }>;
    preferred_delivery_date?: { day: string, time: string };
    confirmed_delivery_date?: string;
    notes?: string;
    price?: number;
    requestSeen?: boolean;
    address?: string;
};

const Dashboard_Home = () => {
    const jobsCollectionRef = collection(db, "jobs");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [sortOption, setSortOption] = useState("date");
    const [sortedJobs, setSortedJobs] = useState(filteredJobs);
    const orderStatus = ["Pending", "Accepted", "Delivered", "Complete"];
    const [showFullCard, setShowFullCard] = useState(false);
    const [expandedCards, setExpandedCards] = useState<{
        [key: number]: boolean;
    }>({});
    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    // This value is not associated with pricing info. This is only for admin editing of job info so that price can be manually adjusted.
    const [appliances, setAppliances] = useState<string[]>([]);
    const [haulAwayLocations, setHaulAwayLocations] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [unacknowledgedRequests, setUnacknowledgedRequests] = useState(0);

    const getJobs = async () => {
        try {
            const data = await getDocs(jobsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setJobs(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    async function getApplianceList() {
        try {
            const prices = await getPrices();

            if (prices !== null) {
                const installAppliances = prices.install;
                if (typeof installAppliances === "object") {
                    setAppliances(Object.keys(installAppliances));
                } else {
                    console.log(
                        "pricesInstall is not an object:",
                        installAppliances
                    );
                    return [];
                }
            } else {
                console.log("Prices is null");
                return [];
            }
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw error;
        }
    }

    async function getHaulAwayLocations() {
        try {
            const prices = await getPrices();

            if (prices !== null) {
                const haulAway = prices.haulAway;
                if (typeof haulAway === "object") {
                    setHaulAwayLocations(Object.keys(haulAway));
                } else {
                    console.log(
                        "haulAway is not an object:",
                        haulAway
                    );
                    return [];
                }
            } else {
                console.log("Prices is null");
                return [];
            }
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw error;
        }
    }

    useEffect(() => {
        updateUnacknowledgedRequests();
    }, [jobs]);

    const updateUnacknowledgedRequests = () => {
        const unacknowledgedCount = jobs.filter(job => job.requestSeen !== true).length;
        setUnacknowledgedRequests(unacknowledgedCount);
    }

    const toggleCard = (id: number) => {
        setExpandedCards({
            ...expandedCards,
            [id]: !expandedCards[id],
        });
    };

    useEffect(() => {
        getJobs();
        getApplianceList();
        getHaulAwayLocations();
    }, []);

    useEffect(() => {
        const searchFilter = jobs.filter((job) => {
            return (
                job.first_name
                    ?.toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                job.last_name?.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        setFilteredJobs(searchFilter);
    }, [searchInput, jobs]);

    useEffect(() => {
        const sortJobs = () => {
            let sorted = [...filteredJobs];
            if (sortOption === "date") {
                sorted = sorted.sort((a, b) => {
                    const dateA = a.createdAt
                        ? a.createdAt.toDate().getTime()
                        : Number.MAX_SAFE_INTEGER;
                    const dateB = b.createdAt
                        ? b.createdAt.toDate().getTime()
                        : Number.MAX_SAFE_INTEGER;
                    return dateA - dateB;
                });
            } else if (sortOption === "paymentStatus:due") {
                sorted = sorted.sort((a, b) => {
                    const paymentA = a.payment_collected ? 1 : 0;
                    const paymentB = b.payment_collected ? 1 : 0;
                    return paymentA - paymentB;
                });
            } else if (sortOption === "paymentStatus:paid") {
                sorted = sorted.sort((a, b) => {
                    const paymentA = a.payment_collected ? 0 : 1;
                    const paymentB = b.payment_collected ? 0 : 1;
                    return paymentA - paymentB;
                });
            } else if (sortOption === "serviceStatus:pending") {
                sorted = sorted.sort((a, b) => {
                    const statusAString =
                        a.orderStatus !== undefined
                            ? a.orderStatus.toString()
                            : "0";
                    const statusBString =
                        b.orderStatus !== undefined
                            ? b.orderStatus.toString()
                            : "0";

                    const statusA = parseInt(statusAString, 10);
                    const statusB = parseInt(statusBString, 10);

                    if (statusA === 0 && statusB !== 0) return -1;
                    if (statusB === 0 && statusA !== 0) return 1;
                    return statusA - statusB;
                });
            } else if (sortOption === "serviceStatus:accepted") {
                sorted = sorted.sort((a, b) => {
                    const isDeliveredA = a.orderStatus === 1 ? 1 : 0;
                    const isDeliveredB = b.orderStatus === 1 ? 1 : 0;
                    return isDeliveredB - isDeliveredA;
                });
            } else if (sortOption === "serviceStatus:delivered") {
                sorted = sorted.sort((a, b) => {
                    const isDeliveredA = a.orderStatus === 2 ? 1 : 0;
                    const isDeliveredB = b.orderStatus === 2 ? 1 : 0;
                    return isDeliveredB - isDeliveredA;
                });
            } else if (sortOption === "serviceStatus:complete") {
                sorted = sorted.sort((a, b) => {
                    const isCompleteA = a.orderStatus === 3 ? 1 : 0;
                    const isCompleteB = b.orderStatus === 3 ? 1 : 0;
                    return isCompleteB - isCompleteA;
                });
            }

            setFilteredJobs(sorted);
        };
        sortJobs();
    }, [sortOption]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        console.log("Sort Option Changed: ", value);
        setSortOption(value);
    };

    const toggleModal = (job: Job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const handleClickAcknowledgeRequest = async (job: Job) => {
        job.requestSeen = true;
        const jobDocRef = doc(db, "jobs", job.id);
        
        try {
            const docSnap = await getDoc(jobDocRef);
            if (docSnap.exists()) {
                // Document exists, update it
                await updateDoc(jobDocRef, { requestSeen: true });
            } else {
                // Document does not exist, add it
                await setDoc(jobDocRef, job);
            }
            updateUnacknowledgedRequests();
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    useEffect(() => {
    }, [refresh]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setSelectedJob((prevJob) => {
            if (!prevJob) return prevJob;

            let updatedValue: any = value;
            if (name === "payment_collected") {
                updatedValue = value === "true";
            }

            if (name.startsWith("services")) {
                const [, index, field] = name.match(/services\[(\d+)\]\.(.*)/)!;
                const updatedServices = prevJob.services
                    ? [...prevJob.services]
                    : [];

                // Update the specific field within the service at the given index
                updatedServices[Number(index)] = {
                    ...updatedServices[Number(index)],
                    [field]: updatedValue,
                };

                return { ...prevJob, services: updatedServices };
            }

            return { ...prevJob, [name]: updatedValue };
        });
    };

    const handleSave = async () => {
        if (selectedJob) {
            if (typeof selectedJob.price === "string") {
                selectedJob.price = parseFloat(selectedJob.price);
            }
            const jobDoc = doc(db, "jobs", selectedJob.id);
            await updateDoc(jobDoc, selectedJob);
            setShowModal(false);
            getJobs(); // Refresh jobs after saving
        }
    };

    return (
        <div className="container flex align-top my-md">

            <div className="flex-1 dashboard-left-nav">
                <DashboardNav />
            </div>

            <div className="flex-6 relative">
                <div>
                    <h2>Orders</h2>
                    {unacknowledgedRequests > 0 ? (<div className="unacknowledged-requests-notification">{unacknowledgedRequests} unacknowledged</div>) : null}
                </div>
                <input
                    className="mb-sm"
                    type="text"
                    placeholder="Search by name..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />

                <div className="mb-sm">
                    <b>Sort by:</b>
                    <select className="my-2 mb-sm" onChange={handleSortChange}>
                        <optgroup label="Date">
                            <option value="date">Date</option>
                        </optgroup>
                        <optgroup label="Service Status">
                            <option value="serviceStatus:pending">
                                Service Status: Pending
                            </option>
                            <option value="serviceStatus:accepted">
                                Service Status: Accepted
                            </option>
                            <option value="serviceStatus:delivered">
                                Service Status: Delivered
                            </option>
                            <option value="serviceStatus:complete">
                                Service Status: Complete
                            </option>
                        </optgroup>
                        <optgroup label="Payment Status">
                            <option value="paymentStatus:due">
                                Payment Status: Due
                            </option>
                            <option value="paymentStatus:paid">
                                Payment Status: Paid
                            </option>
                        </optgroup>
                    </select>
                </div>

                <div>
                    {filteredJobs.map((job: any, index) => (
                        <div
                            key={index}
                            className={`order-card border-status-${job.orderStatus}`}
                        >
                            <div
                                className="order-card-edit"
                                onClick={() => toggleModal(job)}
                            >
                                <FontAwesomeIcon icon={faEdit} />{" "}
                            </div>
                            <div onClick={()=>handleClickAcknowledgeRequest(job)}>{job.requestSeen ?? false ? "" : (<button className="btn-acknowledge">ACKNOWLEDGE REQUEST</button>)}</div>
                            <p><strong>Customer: </strong>{job.first_name} {job.last_name}</p>
                            <p><strong>Phone: </strong>{job.phone}</p>
                            <p><strong>Address: </strong>{job.address ? job.address : "N/A"}</p>
                            <p><strong>Date Submitted: </strong>{job.createdAt ? job.createdAt.toDate().toLocaleString() : "N/A"}</p>
                            <a
                                onClick={() => toggleCard(job.id)}
                                className={
                                    expandedCards[job.id] === true
                                        ? "hide"
                                        : "show"
                                }
                            >
                                Click to expand
                            </a>
                            <div className={expandedCards[job.id] === true ? "show" : "hide"}>
                                <b>Services Requested:</b>
                                <ul>
                                    {job.services.map(
                                        (
                                            service: any,
                                            serviceIndex: number
                                        ) => (
                                            <li key={serviceIndex}>
                                                <span>
                                                    {service.service}{" "}
                                                    {service.appliance}{" "}
                                                    {service.location}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                                <p>
                                    <strong>Preferred Delivery Date: </strong>
                                    {job.preferred_delivery_date.day}{" "}
                                    {job.preferred_delivery_date.time}
                                </p>
                                <p>
                                    <strong>Confirmed Delivery Date: </strong>
                                    {job.confirmed_delivery_date}
                                </p>
                                <p>
                                    <strong>Notes: </strong>"{job.notes}"
                                </p>
                                <p>
                                    <strong>Price: </strong>$
                                    {job.price.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Payment Collected: </strong>
                                    <strong
                                        className={
                                            job.payment_collected
                                                ? "color-status-true"
                                                : "color-status-false"
                                        }
                                    >
                                        {job.payment_collected ? "Yes" : "No"}
                                    </strong>
                                </p>
                                <div className="flex align-center">
                                    <b className="mr-sm">Order Status: </b>
                                    {orderStatus.map((status, index) => (
                                        <p
                                            style={{ marginRight: "10px" }}
                                            className={
                                                status ===
                                                orderStatus[job.orderStatus]
                                                    ? `color-status-${index}`
                                                    : ""
                                            }
                                            key={index}
                                        >
                                            {status}{" "}
                                        </p>
                                    ))}
                                </div>
                                <p>
                                    <strong>Order Status: </strong>
                                    {orderStatus[job.orderStatus]}
                                </p>
                                <a onClick={() => toggleCard(job.id)}className={expandedCards[job.id] === false? "hide": "show"}>Click to Collapse</a>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && selectedJob && (
                    <div className="rld-modal">
                        <div className="rld-modal-content">
                            <span className="close" onClick={handleModalClose}>
                                &times;
                            </span>
                            <h2>Edit Job</h2>
                            <form>
                                <div className="bg-light padding-sm">
                                    <h3>Customer Information</h3>
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={selectedJob.first_name || ""}
                                        onChange={handleInputChange}
                                    />

                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={selectedJob.last_name || ""}
                                        onChange={handleInputChange}
                                    />

                                    <label>Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={selectedJob.phone || ""}
                                        onChange={handleInputChange}
                                    />

                                    <label>Address:</label>
                                    <textarea
                                        name="address"
                                        value={selectedJob.address || ""}
                                        onChange={handleInputChange}/>

                                </div>

                                <div className="bg-light padding-sm">
                                    <h3>Services:</h3>
                                    {(selectedJob.services || []).map(
                                        (service, index) => (
                                            <div key={index}>
                                                <strong>
                                                    Service {index + 1}
                                                </strong>
                                                <br />
                                                <small>Type</small>
                                                <select
                                                    name={`services[${index}].service`}
                                                    value={service.service}
                                                    onChange={handleInputChange}
                                                    className="mb-sm"
                                                >
                                                    <option value="install">
                                                        Install
                                                    </option>
                                                    <option value="haulAway">
                                                        Haul Away
                                                    </option>
                                                </select>
                                                <small>Appliance:</small>
                                                <select
                                                    name={`services[${index}].appliance`}
                                                    value={service.appliance}
                                                    onChange={handleInputChange}
                                                    className="mb-sm"
                                                >
                                                    {appliances.map(
                                                        (
                                                            appliance,
                                                            applianceIndex
                                                        ) => (
                                                            <option
                                                                key={
                                                                    applianceIndex
                                                                }
                                                                value={
                                                                    appliance
                                                                }
                                                            >
                                                                {appliance}
                                                            </option>
                                                        )
                                                    )}
                                                </select>

                                                {service.location && (
                                                    <>
                                                        <small>Location:</small>
                                                        <select
                                                            name={`services[${index}].location`}
                                                            value={service.location}
                                                            onChange={handleInputChange}
                                                            className="mb-sm"
                                                        >
                                                            {haulAwayLocations.map(
                                                                (location, locationIndex) => (
                                                                    <option key={locationIndex}
                                                                        value={location}
                                                                    >
                                                                        {location}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>

                                <label>Preferred Delivery Date:</label>
                                <div>
                                    <label>Day:</label>
                                    <select
                                        name="day"
                                        value={
                                            selectedJob.preferred_delivery_date
                                                ?.day || ""
                                        }
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Day</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">
                                            Wednesday
                                        </option>
                                        <option value="thursday">
                                            Thursday
                                        </option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">
                                            Saturday
                                        </option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Time:</label>
                                    <select
                                        name="time"
                                        value={
                                            selectedJob.preferred_delivery_date
                                                ?.time || ""
                                        }
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Time</option>
                                        <option value="morning">Morning</option>
                                        <option value="afternoon">
                                            Afternoon
                                        </option>
                                    </select>
                                </div>

                                <label>Confirmed Delivery Date:</label>
                                <input
                                    type="date"
                                    name="confirmed_delivery_date"
                                    value={selectedJob.confirmed_delivery_date || ""}
                                    onChange={handleInputChange}
                                />

                                <label>Notes:</label>
                                <textarea
                                    name="notes"
                                    value={selectedJob.notes || ""}
                                    onChange={handleInputChange}
                                ></textarea>

                                <label>Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={selectedJob.price || ""}
                                    onChange={handleInputChange}
                                />

                                <label>Payment Collected:</label>
                                <select
                                    name="payment_collected"
                                    value={
                                        selectedJob.payment_collected
                                            ? "true"
                                            : "false"
                                    }
                                    onChange={handleInputChange}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>

                                <label>Order Status:</label>
                                <select
                                    name="orderStatus"
                                    value={selectedJob.orderStatus || 0}
                                    onChange={handleInputChange}
                                >
                                    {orderStatus.map((status, index) => (
                                        <option key={index} value={index}>
                                            {status}
                                        </option>
                                    ))}
                                </select>

                                <button type="button" className="my-sm" onClick={handleSave}>
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard_Home;