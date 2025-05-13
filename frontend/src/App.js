// frontend/src/App.js
import SearchAirport from './components/SearchAirport';
import './App.css';

function App() {
  return (
      <div className="app-container">
        <h1>Google Flights Clone</h1>
        <SearchAirport />
      </div>
  );
}

export default App;