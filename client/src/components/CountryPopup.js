import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { Popup } from "react-leaflet"
import "../css/countrypopup.css"

const CountryPopup = () => {
    const { selected, resetActiveLayer } = useContext(WorldContext)

    return (
        <Popup position={[selected.latlng[0], selected.latlng[1]]} onClose={() => {
                resetActiveLayer()
            }}>
            <img className="flag-image" src={selected.flag} alt="country flag"/>
            <div className="country-name">{selected.name}</div>
            <div>Capital City: {selected.capital}</div>
            <div>Population: {selected.population}</div>
            <div>Area: {selected.area}</div>
            <div>
                Languages: 
                {
                    selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                }
            </div>
        </Popup>
    )
}

export default CountryPopup