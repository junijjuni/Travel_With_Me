import React, { useEffect, useState } from 'react';
import { getMap } from '../services/api';
import '../App.css';  // Ensure this path is correct for your CSS file

const Map = ({ destination }) => {
  const [mapUrl, setMapUrl] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      console.log('Fetching map for destination:', destination);
      const url = getMap(destination);  // Directly call getMap since it returns a URL
      console.log('Fetched map URL:', url);
      setMapUrl(url);
    };

    fetchMapData();
  }, [destination]);

  if (!mapUrl) return <div>Loading map...</div>;

  return (
    <div className="map-container">
      <img 
        src={mapUrl} 
        alt="Map" 
        onError={(e) => {
          console.error('Image load error:', e);
          console.error('Failed to load map URL:', mapUrl);
        }} 
      />
    </div>
  );
};

export default Map;
