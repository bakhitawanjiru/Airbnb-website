import React from 'react';

const ReportsAnalytics = () => {
    return (
        <div className="admin-tab-content">
            <h2>Reports & Analytics</h2>
            
            <div className="reports-grid">
                <div className="report-card">
                    <h3>Revenue Overview</h3>
                    <div className="chart-placeholder">
                        <p>Revenue chart will be displayed here</p>
                    </div>
                </div>

                <div className="report-card">
                    <h3>Booking Trends</h3>
                    <div className="chart-placeholder">
                        <p>Booking trends chart will be displayed here</p>
                    </div>
                </div>

                <div className="report-card">
                    <h3>Popular Listings</h3>
                    <div className="chart-placeholder">
                        <p>Popular listings chart will be displayed here</p>
                    </div>
                </div>

                <div className="report-card">
                    <h3>User Growth</h3>
                    <div className="chart-placeholder">
                        <p>User growth chart will be displayed here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;