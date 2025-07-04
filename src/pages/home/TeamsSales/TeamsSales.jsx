import React from 'react';
import { FaCalculator, FaAmazon, FaStar, FaPlus, FaUsers, FaBuilding } from 'react-icons/fa';

const TeamsSales = () => {
    const clients = [
        { name: 'CASIO', icon: <FaCalculator className="text-blue-600" /> },
        { name: 'amazon', icon: <FaAmazon className="text-orange-500" /> },
        { name: '$-moonstar', icon: <FaStar className="text-yellow-400" /> },
        { name: 'ST+R+', icon: <FaPlus className="text-red-500" /> },
        { name: 'startpeople', icon: <FaUsers className="text-green-500" /> },
        { name: 'randstad', icon: <FaBuilding className="text-indigo-600" /> }
    ];

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                    We've helped thousands of sales teams
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {clients.map((client, index) => (
                        <div 
                            key={index}
                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50 border border-gray-100"
                        >
                            <div className="text-3xl mb-2">
                                {client.icon}
                            </div>
                            <span className="text-lg font-medium text-gray-700 text-center">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamsSales;