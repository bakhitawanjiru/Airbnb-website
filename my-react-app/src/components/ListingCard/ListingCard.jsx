import React from 'react';
import './ListingCard.css';

const ListingCard = ({ image, title, description, price, rating }) => {
    return (
        <div className="listing-card">
            <div className="listing-image">
                <img src={image} alt={title} />
            </div>
            <div className="listing-content">
                <div className="listing-rating">
                    <span>⭐ {rating}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="listing-price">
                    <span>${price}</span> / night
                </div>
            </div>
        </div>
    );
};

export default ListingCard;