import React, {useContext} from "react"
import Searchbar from './Searchbar'
import { WorldContext } from "../context/WorldContext"
import mapStyles from '../utils/mapStyles'
import "../css/navbar.css"

const Navbar = () => {
    const { layersRef, activeProperty, activeLayer, setTheme } = useContext(WorldContext)

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
        <div className="header-container">
            <header>
                <div className="logo">Countrip</div>

                <Searchbar />

                <div>
                    <input type="checkbox" id="switch" name="theme" onChange={toggleTheme}/><label htmlFor="switch">Toggle</label>
                </div>
            </header>
        </div>
    )
}

export default Navbar