import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Tabs.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/wishlist/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setWishlist(response.data);
        } catch (error) {
            toast.error('Failed to fetch wishlist');
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (listingId) => {
        try {
            await axios.delete(`http://localhost:8000/api/wishlist/${listingId}/`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            fetchWishlist();
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="wishlist-container">
            {wishlist.length === 0 ? (
                <div className="no-items">
                    <h3>Your wishlist is empty</h3>
                    <p>Save your favorite places for later!</p>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map(item => (
                        <div key={item.id} className="wishlist-card">
                            <div className="listing-image">
                                <div className="placeholder-image"></div>
                            </div>
                            <div className="listing-details">
                                <h3>{item.listing.title}</h3>
                                <p className="location">{item.listing.location}</p>
                                <p className="price">${item.listing.price}/night</p>
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeFromWishlist(item.listing.id)}
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;