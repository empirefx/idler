import React from 'react';

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <h3>{place.name}</h3>
      <p className="place-description">{place.description}</p>
      
      <div className="place-details">
        <div className="place-type">
          <span className="label">Type:</span> {place.type}
        </div>
        
        {place.features && Object.keys(place.features).length > 0 && (
          <div className="place-features">
            <span className="label">Features:</span>
            <ul>
              {Object.values(place.features).map(feature => (
                <li key={feature.name}>
                  <strong>{feature.name}</strong>: {feature.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {place.resources && Object.keys(place.resources).length > 0 && (
          <div className="place-resources">
            <span className="label">Resources:</span>
            <ul>
              {Object.entries(place.resources).map(([resource, amount]) => (
                <li key={resource}>
                  {resource}: {'★'.repeat(amount)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {place.connections && place.connections.length > 0 && (
          <div className="place-connections">
            <span className="label">Connected to:</span>
            <ul>
              {place.connections.map(connection => (
                <li key={connection}>{connection}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
