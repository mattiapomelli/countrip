import React, { useState, useEffect, useRef, useContext } from "react"
import { Map, GeoJSON } from "react-leaflet"
import CountryCard from "./CountryCard"
import Statistics from "./Statistics"
import countriesCoords from "../data/countriesSimplified10.json"
import "leaflet/dist/leaflet.css"
import "../css/world.css"
import { WorldContext } from "../context/WorldContext"


let countryStyle = {
    color: "#1793d4",
    opacity: 1,
	weight: 1,	
	fillColor: "#1793d4",
    fillOpacity: 0.6,
    //dashArray: 5
}

const World = () => {
    const [color, setColor] = useState("#000")
    const latestColor = useRef("")
    const { selected, layersRef, setActiveLayer, findCountryByCode } = useContext(WorldContext)

    useEffect(() => {
        latestColor.current = color
    })

    const onCountryClick = (event, code, name) => {
        setActiveLayer(event.target)
    }

    const onEachCountry = (country, layer) => { //run once on each feature
        const code = country.properties.ISO_A3
        const result = findCountryByCode(code)                  //find country by code of the feature
        country.properties.population = result.population       //append population data to the layer's feature so we can access it from there later

        layer.on({
            click: (event) => onCountryClick(event, code, country.properties.ADMIN)
            //mouseover
        })
    }

    const changeColor = (event) => {
        setColor(event.target.value)
    }

    return (
        <div className="main-container">
            <Map zoom={2} center={[40, 0]}>
                <GeoJSON ref={layersRef} style={countryStyle} data={countriesCoords.features} onEachFeature={onEachCountry}/>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
                {
                    selected && <CountryCard/>
                }
            </Map>
            <div className="statistics-container">
                <input type="color" onChange={changeColor}/>
                <Statistics />  
            </div>   
        </div>
    )
}

export default World