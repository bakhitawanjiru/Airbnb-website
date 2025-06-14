import React from 'react';
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
    return (
        <div className="home">
            <header className="hero">
                <div className="hero-content">
                    <h1>Find Your Perfect Stay</h1>
                    <p>Discover unique places and experiences around the world</p>
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Where would you like to go?"
                            className="search-input"
                        />
                        <button className="search-button">
                            Explore Now
                        </button>
                    </div>
                </div>
            </header>

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