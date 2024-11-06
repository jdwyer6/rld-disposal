import { TbCalendarEvent, TbUsers, TbTools } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import heroImage from '../images/truck.png';
import team from '../images/team.png';
import { useEffect, useState } from 'react';

const Home = () => {

    return (
        <div className="flex flex-col bg-white text-gray-900 max-w-[1400px] mx-auto">

            <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white relative md:h-screen gap-8">
                {/* Left Section - Text and App Store Links */}
                <div className="md:w-1/2 space-y-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-primary text-center md:text-left">
                        Appliance Pickup and Installation.
                    </h1>
                    <p className="text-gray-600">
                        Affordable and reliable solutions for new or old major appliances.
                    </p>
                        <Link to="/services" className="w-full no-underline">
                            <button className="px-6 py-6 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-brand-primary rounded-lg hover:bg-brand-primary-light focus:outline-none focus:ring focus:ring-primary-dark focus:ring-opacity-80 mt-2">Book Your Service Now</button>
                        </Link>
                </div>

                {/* Right Section - Image */}
                <div className="md:w-1/2 flex justify-center relative z-10 mt-10 md:mt-0">
                    <img src={heroImage} alt="Devices" className="w-full max-w-lg" />
                </div>

                {/* Background Shapes */}
                <div className="hidden md:block">
                    <div className="absolute top-0 translate-y-1/4 left-1/4 w-48 h-48 bg-brand-primary-veryLight rounded opacity-50 transform -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-secondary-light rounded opacity-50 transform translate-y-16"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-primary-veryLight rounded opacity-50 transform translate-x-16 -translate-y-8"></div>
                </div>
                


            </section>

            {/* Service Highlights Section */}
            <div className="py-20 px-4 md:px-0">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-brand-primary">Our Key Services</h2>
                <div className="grid gap-8 md:grid-cols-3 w-full">
                    <div className="flex flex-col items-center text-center p-6 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow">
                        <TbCalendarEvent className="text-5xl text-brand-primary mb-4" />
                        <h3 className="text-xl font-semibold">Flexible Scheduling</h3>
                        <p className="text-sm mt-2">Book appointments at your convenience, with options for both online and in-person consultations.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow">
                        <TbUsers className="text-5xl text-brand-primary mb-4" />
                        <h3 className="text-xl font-semibold">Trusted Team</h3>
                        <p className="text-sm mt-2">Our team of professionals ensures that every installation, delivery, and disposal is done with care.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow">
                        <TbTools className="text-5xl text-brand-primary mb-4" />
                        <h3 className="text-xl font-semibold">Comprehensive Solutions</h3>
                        <p className="text-sm mt-2">We handle everything from setup to disposal, making appliance management easy and hassle-free.</p>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="py-20 bg-white">
                <div className="flex flex-col md:flex-row items-center px-4 gap-10 w-full">
                    <div className="w-full md:w-1/2">
                        <img src={team} alt="Our Team" className="rounded-lg shadow-md" />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-primary">Trusted Service Since 1953</h2>
                        <p className="text-lg mb-4">
                            For over 70 years, we’ve been dedicated to offering quality appliance services. Our experience and expertise make us a reliable choice for any appliance needs, whether it’s delivery, installation, or disposal.
                        </p>
                        <Link to="/about">
                            <button className="px-6 py-3 bg-brand-primary text-white rounded-md font-medium shadow-md hover:shadow-lg hover:bg-brand-primary-dark transition duration-200 no-underline">
                                Learn More About Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-16 bg-[#FAFAFA] text-center">
                <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-semibold mb-4">Ready to Book an Appointment?</h3>
                    <p className="text-sm mb-6">Choose a time that works for you and let us take care of the rest.</p>
                    <Link to="/schedule">
                        <button className="px-8 py-3 bg-brand-primary text-white rounded-full shadow-lg hover:bg-brand-primary-dark transition duration-300 no-underline">
                            Schedule Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
