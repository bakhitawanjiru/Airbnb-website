import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Tabs.css';

const UpcomingTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcomingTrips();
    }, []);

    const fetchUpcomingTrips = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/bookings/upcoming/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setTrips(response.data);
        } catch (error) {
            toast.error('Failed to fetch upcoming trips');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="trips-container">
            {trips.length === 0 ? (
                <div className="no-trips">
                    <h3>No upcoming trips</h3>
                    <p>Start planning your next adventure!</p>
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
                            <button className="view-details-btn">View Details</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UpcomingTrips;