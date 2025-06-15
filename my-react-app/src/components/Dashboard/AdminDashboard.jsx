import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserManagement from './AdminTabs/UserManagement';
import ListingManagement from './AdminTabs/ListingManagement';
import BookingManagement from './AdminTabs/BookingManagement';
import ReportsAnalytics from './AdminTabs/ReportsAnalytics';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('users');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalListings: 0,
        totalBookings: 0,
        revenue: 0
    });

    const renderTabContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement />;
            case 'listings':
                return <ListingManagement />;
            case 'bookings':
                return <BookingManagement />;
            case 'reports':
                return <ReportsAnalytics />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p className="admin-welcome">Welcome, {user?.username}</p>
            </div>

            <div className="stats-overview">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Listings</h3>
                    <p className="stat-number">{stats.totalListings}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p className="stat-number">{stats.totalBookings}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p className="stat-number">${stats.revenue}</p>
                </div>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    User Management
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('listings')}
                >
                    Listing Management
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Booking Management
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                >
                    Reports & Analytics
                </button>
            </div>

            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;