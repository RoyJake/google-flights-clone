import { useState } from 'react';
import { Search } from "lucide-react"
import axios from 'axios';
import './SearchFlight.css';

const SearchFlight = () => {
  const [originSkyId, setOriginSkyId] = useState('');
  const [destinationSkyId, setDestinationSkyId] = useState('');
  const [originEntityId, setOriginEntityId] = useState('');
  const [destinationEntityId, setDestinationEntityId] = useState('');
  const [date, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setFlights([]);

    try {
      let url = 'http://localhost:5000/api/flights';
      const params = new URLSearchParams();
      if (originSkyId) params.append('originSkyId', originSkyId);
      if (destinationSkyId) params.append('destinationSkyId', destinationSkyId);
      if (originEntityId) params.append('originEntityId', originEntityId);
      if (destinationEntityId) params.append('destinationEntityId', destinationEntityId);
      if (date) params.append('date', date);
      if (returnDate) params.append('returnDate', returnDate);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = response.data.data;

      console.log(data)

      if (data) {
        setFlights(data);
        setCarriers(data.filterStats.carriers)
      } else {
        setFlights([]);
        setCarriers([]);
        setError("No flights found.");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };






  return (
    <div className="container">
      <div className="main-content">
        <h1 className="title">Flight Search</h1>
        <div className="input-button-container">
          <input
            type="text"
            placeholder="Origin Sky ID"
            value={originSkyId}
            onChange={(e) => setOriginSkyId(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Destination Sky ID"
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-button-container">
          <input
            type="text"
            placeholder="Origin Entity ID"
            value={originEntityId}
            onChange={(e) => setOriginEntityId(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Destination Entity ID"
            value={destinationEntityId}
            onChange={(e) => setDestinationEntityId(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-button-container">
          <input
            type="date"
            placeholder="Departure Date"
            value={date}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="input"
          />
          <input
            type="date"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="input"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="button"
        >
          {loading ? (
            <>Searching...</>
          ) : (
            <>
              <Search className="search-icon" />
              Explore
            </>
          )}
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {carriers.length > 0 && (
          <div className="results-card">
            <div className="results-header">
              <h2 className="results-title">Flights</h2>
            </div>
            <div className="results-content">
              <div className="carriers-grid">
                {carriers.map((carrier, index) => (
                  <div key={index} className="carrier-item">
                    <img src={carrier.logoUrl} alt={carrier.name} className="carrier-image" />
                    <div className="carrier-info">
                      <h3 className="carrier-name">{carrier.name}</h3>
                      <p className="destination-price">
                        {flights.filterStats.stopPrinces.direct.formattedPrice ? ` ${flights.filterStats.stopPrinces.direct.formattedPrice}` : 'Price N/A'}
                      </p>
                    </div>
                    <img src={flights.destinationImageUrl} alt={flights.flightsSessionId} className="destination-image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFlight;

