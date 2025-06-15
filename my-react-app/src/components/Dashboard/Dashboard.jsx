import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/listings/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setListings(response.data);
        } catch (error) {
            toast.error('Failed to fetch listings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user?.username}!</h1>
                <p className="subtitle">Find your perfect stay</p>
            </div>

            <div className="listings-section">
                <h2>Available Listings</h2>
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : (
                    <div className="listings-grid">
                        {listings.map(listing => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-image">
                                    <div className="placeholder-image"></div>
                                </div>
                                <div className="listing-details">
                                    <h3>{listing.title}</h3>
                                    <p className="location">{listing.location}</p>
                                    <p className="price">${listing.price}/night</p>
                                    <button className="book-btn">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;