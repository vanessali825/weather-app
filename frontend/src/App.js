import './App.css';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';

function App() {
  return (
    <div className="App">
      <h1>Weather Application</h1>
      <SearchBar />
      <br />
      {/* <WeatherInfo /> */}
    </div>
  );
}

export default App;
