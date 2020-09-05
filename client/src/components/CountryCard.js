import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { Popup } from "react-leaflet"
import "../css/countrycard.css"

const CountryCard = () => {
    const { selected, setSelected, activeLayer } = useContext(WorldContext)

    return (
        <Popup position={[selected.latlng[0], selected.latlng[1]]} onClose={() => {
                setSelected(null)
                activeLayer.current.setStyle({fillColor: "#1793d4"})    //reset the style to default
                activeLayer.current = null                              //set active layer to null
            }}>
            <img className="flag-image" src={selected.flag} alt="country flag"/>
            <div className="country-name">{selected.name}</div>
            <div>Capital City: {selected.capital}</div>
            <div>Population: {selected.population}</div>
            <div>
                Languages: 
                {
                    selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                }
            </div>
        </Popup>
    )
}

export default CountryCard