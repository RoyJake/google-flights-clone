import React, { useState } from 'react';
import { Search } from "lucide-react"
import axios from 'axios';
import './SearchAirport.css';

const SearchAirport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/airports?query=${encodeURIComponent(searchQuery)}`)


      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data.data;

      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
        setError("No airports found matching your query.");
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
        <h1 className="title">
          Airport Search
        </h1> 

        {/* Search Input and Button */}
        <div className="input-button-container">
          <input
            type="text"
            placeholder="Search for airports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
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
                Search
              </>
            )}
          </button>
        </div>

        {/* Display Results */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="results-card">
            <div className="results-header">
              <h2 className="results-title">Search Results</h2>
            </div>
            <div className="results-content">
              <div className="space-y-4">
                {results.map((airport, index) => (
                  <div
                    key={index}
                    className="result-item"
                  >
                    <h2 className="result-item-title">{airport.presentation.title}, {airport.presentation.subtitle}</h2>
                    <p>Airport Name: {airport.presentation.title}</p>
                    <p>IATA Code: {airport.entityId}</p>
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

export default SearchAirport;

