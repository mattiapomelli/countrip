import React, { useContext } from 'react';
import World from './components/World'
import CountryCard from './components/CountryCard'
import Statistics from './components/Statistics'
import Searchbar from './components/Searchbar'
import "./style.css"
import { WorldContext } from './context/WorldContext';

function App() {
  const { selected } = useContext(WorldContext)

  return (
    <div className="App">
      <div className="main-container">
        <World />
        <div className="country-card">
          {
            selected ? <CountryCard /> :
            <div className="empty-card-container">
              <h4>Click on a country</h4>
            </div>
          }
        </div>
        
        <Searchbar />
        {/* <input type="color" onChange={changeColor}/> */}
        <Statistics />
      </div>
    </div>
  );
}

export default App;
