import React from 'react';
import World from './components/World'
import CountryCard from './components/CountryCard'
import Statistics from './components/Statistics'
import Searchbar from './components/Searchbar'
import "./style.css"

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <World />
        <CountryCard />
        <Searchbar />
        {/* <input type="color" onChange={changeColor}/> */}
        <Statistics />
      </div>
    </div>
  );
}

export default App;
