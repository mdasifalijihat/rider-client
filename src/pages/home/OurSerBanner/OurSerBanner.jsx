import React from 'react';
import { FaShippingFast, FaMapMarkedAlt, FaWarehouse, FaMoneyBillWave, FaBusinessTime, FaExchangeAlt } from 'react-icons/fa';

const OurSerBanner = () => {
    const services = [
        {
            title: "Express & Standard Delivery",
            description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
            icon: <FaShippingFast className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-blue-500 to-blue-700"
        },
        {
            title: "Nationwide Delivery",
            description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
            icon: <FaMapMarkedAlt className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-green-500 to-green-700"
        },
        {
            title: "Fulfillment Solution",
            description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
            icon: <FaWarehouse className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-purple-500 to-purple-700"
        },
        {
            title: "Cash on Home Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
            icon: <FaMoneyBillWave className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
        },
        {
            title: "Corporate Service / Contract Logistics",
            description: "Customized corporate services which includes warehouse and inventory management support.",
            icon: <FaBusinessTime className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-red-500 to-red-700"
        },
        {
            title: "Parcel Return",
            description: "Through our reverse logistics facility we allow customers to return or exchange their products with online business merchants.",
            icon: <FaExchangeAlt className="text-4xl text-black" />,
            color: "bg-gradient-to-br from-indigo-500 to-indigo-700"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div 
                        key={index}
                        className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:z-10 ${service.color} text-white`}
                    >
                        <div className="p-6 h-full flex flex-col">
                            <div className="mb-4 text-white bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                {service.icon}
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-center">{service.title}</h2>
                            <p className="text-white text-opacity-90 mb-4 flex-grow">{service.description}</p>
                            <button className="mt-auto bg-white bg-opacity-20 hover:bg-opacity-30 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurSerBanner;