import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './HostDashboard.css';

const HostDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="host-dashboard">
            <div className="dashboard-header">
                <h1>Host Dashboard</h1>
                <button className="create-listing-btn">Create New Listing</button>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Active Listings</h3>
                    <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p className="stat-number">$0</p>
                </div>
            </div>

            <div className="listings-section">
                <h2>Your Listings</h2>
                <div className="placeholder-content">
                    <h3>No Listings Yet</h3>
                    <p>Start by creating your first listing!</p>
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;