import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../services/firebase';

const ItineraryForm = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('itineraries').add({
        title,
        destination,
        notes,
        startDate,
        endDate,
        createdAt: new Date(),
      });
      setTitle('');
      setDestination('');
      setNotes('');
      setStartDate('');
      setEndDate('');
      history.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">Create Itinerary</button>
    </form>
  );
};

export default ItineraryForm;
