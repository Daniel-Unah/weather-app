import React from 'react';
import './Favorites.css'; 

const Favorites = ({ favorites, favoriteSelect }) => {
  return (
    <div className="favorites-section">
      {favorites && favorites.length > 0 ? (
        <>
          <h3>Favorites</h3>
          <table className="favorites-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Temperature (°F)</th>
                <th>Description</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Favorites;
