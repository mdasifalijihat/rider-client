import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useRef, useEffect } from "react";
import districtData from "../../../public/warehouses.json";

// ✅ Center of Bangladesh
const bangladeshCenter = [23.685, 90.3563];

// ✅ Define custom icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// ✅ Helper component to control map view on search
const MapFlyTo = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 11); // zoom into searched district
    }
  }, [position, map]);

  return null;
};

const CoverageMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePosition, setActivePosition] = useState(null);
  const markerRefs = useRef({}); // to hold refs for each marker

  // ✅ Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const match = districtData.find((d) =>
      d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      setActivePosition([match.latitude, match.longitude]);
      // ✅ Open the popup if marker ref exists
      const marker = markerRefs.current[match.district];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-xl relative">
      {/* 🔍 Search Box */}
      <form onSubmit={handleSearch} className="absolute z-[1000] w-full flex justify-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
        />
      </form>

      {/* 🗺️ Map */}
      <MapContainer center={bangladeshCenter} zoom={7} className="h-full w-full z-0">
        <MapFlyTo position={activePosition} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Markers */}
        {districtData.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
            icon={customIcon}
            ref={(ref) => (markerRefs.current[district.district] = ref)}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
              {district.district}
            </Tooltip>

            <Popup>
              <div>
                <h2 className="font-bold text-lg">{district.district}</h2>
                <p className="text-sm text-gray-700">
                  <strong>City:</strong> {district.city}<br />
                  <strong>Region:</strong> {district.region}<br />
                  <strong>Covered Areas:</strong> {district.covered_area.join(", ")}
                </p>
                <a
                  href={district.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Flowchart
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
