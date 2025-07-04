import React from 'react';

const WorkBanner = () => {
    const features = [
        {
            title: "Booking Pick & Drop",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            icon: "🚚",
            gradient: "from-blue-500 to-purple-600"
        },
        {
            title: "Cash On Delivery",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            icon: "💰",
            gradient: "from-green-500 to-teal-600"
        },
        {
            title: "Delivery Hub",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            icon: "🏪",
            gradient: "from-orange-500 to-pink-600"
        },
        {
            title: "Booking SME & Corporate",
            description: "From personal packages to business shipments — we deliver on time, every time.",
            icon: "🏢",
            gradient: "from-indigo-500 to-blue-600"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">How it Works</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        className={`rounded-2xl p-0.5 bg-gradient-to-br ${feature.gradient} transition-all duration-500 hover:scale-105 hover:shadow-xl`}
                        onClick={() => console.log(`${feature.title} clicked`)}
                    >
                        <div className="card bg-white dark:bg-gray-800 rounded-[calc(1rem-2px)] h-full p-6 cursor-pointer">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h2 className="card-title text-2xl font-semibold text-gray-800 dark:text-white">
                                    {feature.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkBanner;