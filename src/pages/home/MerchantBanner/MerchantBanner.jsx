import React from 'react';

const MerchantBanner = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Merchant and Customer Satisfaction <br />
          <span className="text-blue-600">is Our First Priority</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          We offer the lowest delivery charge with the highest value along with 100% safety of your product. 
          Pathoo courier delivers your parcels in every corner of Bangladesh right on time.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
            Become a Merchant
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantBanner;