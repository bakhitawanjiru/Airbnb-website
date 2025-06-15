import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import ListingCard from '../ListingCard/ListingCard';
import './Home.css';

const dummyListings = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        title: 'Luxury Beach Villa',
        description: 'Stunning beachfront villa with private pool and ocean views',
        price: 299,
        rating: 4.9
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        title: 'Mountain Retreat',
        description: 'Cozy cabin in the woods with panoramic mountain views',
        price: 159,
        rating: 4.8
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
        title: 'Modern City Apartment',
        description: 'Stylish downtown apartment with city skyline views',
        price: 199,
        rating: 4.7
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        title: 'Countryside Cottage',
        description: 'Charming cottage surrounded by beautiful gardens',
        price: 129,
        rating: 4.9
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listings/search/?${new URLSearchParams({
                location: searchParams.location,
                check_in: searchParams.checkIn,
                check_out: searchParams.checkOut,
                guests: searchParams.guests
            })}`);
            
            if (!response.ok) {
                throw new Error('Search failed');
            }
            
            const data = await response.json();
            navigate('/search', { state: { results: data, searchParams } });
        } catch (error) {
            console.error('Search error:', error);
            alert('Unable to perform search. Please try again later.');
        }
    };

    return (
        <div className="home">
            <div className="hero">
                <div className="hero-content">
                    <h1>Find your next stay</h1>
                    <p>Search low prices on accommodations for your dream vacation</p>
                    
                    <div className="search-wrapper">
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="search-box">
                                <div className="search-input-group">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Where are you going?"
                                        value={searchParams.location}
                                        onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                                    />
                                </div>

                                <div className="search-divider"></div>

                                <div className="search-input-group dates">
                                    <FaCalendarAlt className="search-icon" />
                                    <div className="date-inputs">
                                        <input
                                            type="date"
                                            value={searchParams.checkIn}
                                            onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                                            placeholder="Check-in"
                                        />
                                        <span className="date-separator">→</span>
                                        <input
                                            type="date"
                                            value={searchParams.checkOut}
                                            onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                                            placeholder="Check-out"
                                        />
                                    </div>
                                </div>

                                <div className="search-divider"></div>

                                <div className="search-input-group">
                                    <FaUser className="search-icon" />
                                    <input
                                        type="number"
                                        min="1"
                                        value={searchParams.guests}
                                        onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                                        placeholder="Guests"
                                    />
                                </div>

                                <button type="submit" className="search-button">
                                    <FaSearch /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section className="featured-listings">
                <h2>Popular Destinations</h2>
                <div className="listings-grid">
                    {dummyListings.map(listing => (
                        <ListingCard 
                            key={listing.id}
                            {...listing}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;