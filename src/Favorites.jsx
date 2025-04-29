import React from 'react';

const Favorites = ({favorites}) => {
    if (!favorites || favorites.length === 0) {
        return null; // No favorites to display
    }
    return (
        <div className="favorites-section">
        {favorites.length > 0 ? (
            <>
            <h3>Favorites</h3>
            <ul>
                {favorites.map(fav => (
                <li key={fav.id}>
                    <h4>{fav.name}, {fav.country}</h4>
                    <p><strong>Temperature:</strong> {fav.temp}°F</p>
                    <p><strong>Description:</strong> {fav.description}</p>
                </li>
                ))}
            </ul>
            </>
        ) : (
            <p>No favorites added yet.</p>
        )}
        </div>
  );
};

export default Favorites;
