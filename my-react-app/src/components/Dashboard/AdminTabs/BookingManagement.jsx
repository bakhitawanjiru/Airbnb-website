import React, { useState } from 'react';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    return (
        <div className="admin-tab-content">
            <h2>Booking Management</h2>
            
            <div className="booking-filters">
                <input 
                    type="text" 
                    placeholder="Search bookings..."
                    className="search-input"
                />
                <select className="filter-select">
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="booking-list">
                {bookings.length === 0 ? (
                    <div className="no-data">
                        <p>No bookings found</p>
                    </div>
                ) : (
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Guest</th>
                                <th>Property</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Booking rows will be added here */}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BookingManagement;