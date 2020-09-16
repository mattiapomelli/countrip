import React, { useContext } from 'react';
import World from './components/World'
import CountryCard from './components/CountryCard'
import Statistics from './components/Statistics'
import Searchbar from './components/Searchbar'
import './css/theme.css'
import "./style.css"
import { WorldContext } from './context/WorldContext';
import mapStyles from './utils/mapStyles'

function App() {
  	const { selected, layersRef, activeProperty, activeLayer, setTheme } = useContext(WorldContext)

  	const toggleTheme = (event) => {

    	if(event.target.checked) {
			changeTheme('dark')
        
    	} else {
			changeTheme('light')
    	}
	  }
	  
	const changeTheme = (mode) => {
		themeTransition()
      	document.documentElement.setAttribute('data-theme', mode)
      	setTheme(mode)
      	layersRef.current.leafletElement.setStyle(mapStyles[mode].default)				// change theme of default things
      	layersRef.current.leafletElement.setStyle(mapStyles[mode][activeProperty])		// for active property
      	if(activeLayer.current){
        	activeLayer.current.setStyle(mapStyles[mode].active)						// for active layer
      	}
	}

	const themeTransition = () => {			//sets a temporary class for transition all the changes caused by the team
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
