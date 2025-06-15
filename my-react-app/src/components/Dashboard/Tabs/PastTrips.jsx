import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Tabs.css';

const PastTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPastTrips();
    }, []);

    const fetchPastTrips = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/bookings/past/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setTrips(response.data);
        } catch (error) {
            toast.error('Failed to fetch past trips');
        } finally {
            setLoading(false);
        }
    };

    const handleReview = (tripId) => {
        // Add review functionality
        toast.info('Review feature coming soon!');
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="trips-container">
            {trips.length === 0 ? (
                <div className="no-trips">
                    <h3>No past trips</h3>
                    <p>Your completed trips will appear here</p>
                </div>
            ) : (
                trips.map(trip => (
                    <div key={trip.id} className="trip-card">
                        <div className="trip-image">
                            <div className="placeholder-image"></div>
                        </div>
                        <div className="trip-details">
                            <h3>{trip.listing.title}</h3>
                            <p className="location">{trip.listing.location}</p>
                            <p className="dates">
                                {new Date(trip.check_in).toLocaleDateString()} - 
                                {new Date(trip.check_out).toLocaleDateString()}
                            </p>
                            <button 
                                className="review-btn"
                                onClick={() => handleReview(trip.id)}
                            >
                                Leave a Review
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PastTrips;