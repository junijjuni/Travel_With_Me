import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../services/firebase';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is authenticated:', user);
        const unsubscribeFirestore = firestore.collection('itineraries')
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
            const newItineraries = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setItineraries(newItineraries);
          }, error => {
            console.error('Error fetching itineraries:', error);
          });

        return () => unsubscribeFirestore();
      } else {
        console.error('User is not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Itineraries</h1>
      <ul>
        {itineraries.map(itinerary => (
          <li key={itinerary.id}>
            <Link to={`/itineraries/${itinerary.id}`}>{itinerary.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryList;
