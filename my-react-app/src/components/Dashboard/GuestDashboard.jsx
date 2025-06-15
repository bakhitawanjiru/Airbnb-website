import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './GuestDashboard.css';

const GuestDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('upcoming');

    // Placeholder data until backend is ready
    const placeholderData = {
        upcoming: [],
        past: [],
        wishlist: [],
        messages: []
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'upcoming':
                return (
                    <div className="placeholder-content">
                        <h3>Upcoming Trips</h3>
                        <p>No upcoming trips scheduled</p>
                        <button className="browse-btn">Browse Places</button>
                    </div>
                );
            case 'past':
                return (
                    <div className="placeholder-content">
                        <h3>Past Trips</h3>
                        <p>Your travel history will appear here</p>
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="placeholder-content">
                        <h3>Wishlist</h3>
                        <p>Save your favorite places here</p>
                    </div>
                );
            case 'messages':
                return (
                    <div className="placeholder-content">
                        <h3>Messages</h3>
                        <p>Your conversations will appear here</p>
                    </div>
                );
            case 'profile':
                return (
                    <div className="profile-content">
                        <h3>Profile Settings</h3>
                        <div className="profile-info">
                            <p><strong>Username:</strong> {user?.username}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="guest-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user?.username}!</h1>
            </div>
            
            <div className="dashboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming Trips
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                >
                    Past Trips
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                >
                    Wishlist
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Messages
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile Settings
                </button>
            </div>

            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default GuestDashboard;