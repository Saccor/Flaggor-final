import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const continents = ['Asia', 'Africa', 'Europe'];

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
    setCountries([]);
    setSelectedCountry(null);
  };

  const handleFetchCountries = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${selectedContinent}`);

      const countriesData = response.data.map(country => ({
        name: country.name.common,
        flag: country.flags.png,
        capital: country.capital ? country.capital[0] : 'N/A',
        population: country.population ? country.population.toLocaleString() : 'N/A',
      }));

      setCountries(countriesData);
      setSelectedCountry(null);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const handleFlagClick = (index) => {
    setSelectedCountry(selectedCountry === index ? null : index);
  };

  return (
    <div className="App">
      <h1>Välj en världsdel</h1>
      <select value={selectedContinent} onChange={handleContinentChange}>
        <option value="">Välj en världsdel</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      <button onClick={handleFetchCountries} disabled={!selectedContinent}>
        Hämta länder
      </button>
      <h2>{selectedContinent && `Länder i ${selectedContinent}:`}</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={country.name} onClick={() => handleFlagClick(index)}>
            <img src={country.flag} alt={country.name} />
            {selectedCountry === index && (
              <div>
                <h3>{country.name}</h3>
                <p>Huvudstad: {country.capital}</p>
                <p>Invånare: {country.population}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
