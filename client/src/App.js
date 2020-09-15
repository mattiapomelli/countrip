import React, { useContext } from 'react';
import World from './components/World'
import CountryCard from './components/CountryCard'
import Statistics from './components/Statistics'
import Searchbar from './components/Searchbar'
import './css/theme.css'
import "./style.css"
import { WorldContext } from './context/WorldContext';

function App() {
  const { selected } = useContext(WorldContext)

  const toggleTheme = (event) => {
    if(event.target.checked) {
      transition()
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      transition()
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  const transition = () => {
    document.documentElement.classList.add('transition')
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 1000)
  }

  return (
    <div className="App">
  
    <input type="checkbox" id="switch" name="theme" onChange={toggleTheme}/><label htmlFor="switch">Toggle</label>

      <div className="main-container">
        <World />
        <div className="country-card">
          {
            selected ? <CountryCard /> :
            <div className="empty-card-container">
              <h4 className="try">Click on a country</h4>
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
