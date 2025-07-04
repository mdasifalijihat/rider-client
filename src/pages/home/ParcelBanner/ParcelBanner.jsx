import React from 'react';
import { FaMapMarkerAlt, FaLock, FaPhoneAlt } from 'react-icons/fa';

const ParcelBanner = () => {
  const features = [
    {
      title: "Live Parcel Tracking",
      description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      icon: <FaMapMarkerAlt className="text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "100% Safe Delivery",
      description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      icon: <FaLock className="text-white" />,
      color: "bg-green-600"
    },
    {
      title: "24/7 Call Center Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      icon: <FaPhoneAlt className="text-white" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className={`${feature.color} h-2 w-full`}></div>
            <div className="p-6">
              <div className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelBanner;