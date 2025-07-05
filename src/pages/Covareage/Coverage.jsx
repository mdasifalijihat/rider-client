import React from "react";
import CoverageMap from "./CoverageMap";

const Coverage = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-4">
          We are available in 64 districts
        </h2>      

        {/* Map Section */}
        <CoverageMap />
      </div>
    </div>
  );
};

export default Coverage;
