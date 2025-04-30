import React from 'react';
import './Favorites.css'; 

const Favorites = ({ favorites, favoriteSelect, removeFavorite }) => {
  return (
    <div className="favorites-section">
      {favorites && favorites.length > 0 ? (
        <>
          <h3 id="tableTitle">Favorites</h3>
          <table className="favorites-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Temperature (°F)</th>
                <th>Description</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map(fav => (
                <tr 
                  key={fav.id}
                  onClick={() => favoriteSelect(fav.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{fav.name}</td>
                  <td>{fav.country}</td>
                  <td>{fav.temp}</td>
                  <td>{fav.description}</td>
                  <td>
                    <button onClick={(e) => {
                        e.stopPropagation(); 
                        removeFavorite(fav.id);
                    }}
                    className="remove-btn"
                    >
                    ❌
                    </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p id="placeholderText">Add a city to favorites and it will show up here.</p>
      )}
    </div>
  );
};

export default Favorites;
