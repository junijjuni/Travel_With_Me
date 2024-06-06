import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../services/firebase';
import Map from './Map';
import Weather from './Weather';

const ItineraryDetails = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const doc = await firestore.collection('itineraries').doc(id).get();
        if (doc.exists) {
          setItinerary({ id: doc.id, ...doc.data() });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchItinerary();
  }, [id]);

  if (!itinerary) return <div>Loading...</div>;

  // Example coordinates for Seattle, ensure your data source provides these
  const destination = {
    latitude: 47.6062,  // Example latitude for Seattle
    longitude: -122.3321,  // Example longitude for Seattle
  };

  return (
    <div>
      <h1>{itinerary.title}</h1>
      <p>Destination: {itinerary.destination}</p>
      <p>Notes: {itinerary.notes}</p>
      <p>Start Date: {itinerary.startDate}</p>
      <p>End Date: {itinerary.endDate}</p>
      <Map destination={destination} />
      <Weather location={itinerary.destination} startDate={itinerary.startDate} />
    </div>
  );
};

export default ItineraryDetails;
