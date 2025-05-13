// frontend/src/App.js
import SearchAirport from './components/SearchAirport';
import SearchFlight from './components/SearchFlight';
import './App.css';


function App() {
  return (
      <div className="app-container">
        <h1>Google Flights Clone</h1>
        <SearchAirport />
        <SearchFlight />
      </div>
  );
}

export default App;