import React, { useContext } from 'react';
import World from './components/World'
import CountryCard from './components/CountryCard'
import Statistics from './components/Statistics'
import Searchbar from './components/Searchbar'
import Navbar from './components/Navbar'
import './css/theme.css'
import "./style.css"
import { WorldContext } from './context/WorldContext';


function App() {
  	const { selected } = useContext(WorldContext)

  return (
    <div className="App">
	
	<Navbar />

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
			<Statistics />
		</div>
    </div>
  );
}

export default App;
