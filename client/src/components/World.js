import React, { useState, useEffect, useRef, useContext } from "react"
import { Map, GeoJSON, Marker } from "react-leaflet"
import { Icon } from "leaflet";
import Control from "react-leaflet-control"
import CountryCard from "./CountryCard"
import Statistics from "./Statistics"
import countriesCoords from "../data/countriesSimplified10.json"
import "leaflet/dist/leaflet.css"
import "../css/world.css"
import { WorldContext } from "../context/WorldContext"
import mapStyles from "../utils/mapStyles"

const markerIcon = new Icon({
    iconUrl: "/icons/markericon.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
})

const World = () => {
    const [color, setColor] = useState("#000")
    const latestColor = useRef("")
    const { selected, layersRef, setActiveLayer, findCountryByCode } = useContext(WorldContext)

    useEffect(() => {
        latestColor.current = color
    })

    const onCountryClick = (event) => {
        console.log("country")
        setActiveLayer(event.target)
    }

    const onEachCountry = (country, layer) => { //run once on each feature
        const code = country.properties.ISO_A3
        const result = findCountryByCode(code)                  //find country by code of the feature
        country.properties.population = result.population       //append population data to the layer's feature so we can access it from there later
        country.properties.area = result.area

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
            <Map zoom={2} center={[40, 0]} onclick={() => console.log("map")}>
                <GeoJSON ref={layersRef} style={mapStyles.default} data={countriesCoords.features} onEachFeature={onEachCountry}/>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
                {
                    selected && <Marker position={[selected.latlng[0], selected.latlng[1]]} icon={markerIcon}/>
                }
                <Control position="topright">
                    <div className="legend">
                        <i style={{backgroundColor: "#FFEDA0"}}></i>0 - 1000000<br />
                        <i style={{backgroundColor: "#FED976"}}></i>1.000.000 - 2.000.000<br />
                        <i style={{backgroundColor: "#FEB24C"}}></i>2.000.000 - 5.000.000<br />
                        <i style={{backgroundColor: "#FD8D3C"}}></i>5.000.000 - 10.000.000<br />
                        <i style={{backgroundColor: "#FC4E2A"}}></i>10.000.000 - 20.000.000<br />
                        <i style={{backgroundColor: "#E31A1C"}}></i>20.000.000 - 50.000.000<br />
                        <i style={{backgroundColor: "#BD0026"}}></i>50.000.000 - 100.000.000<br />
                        <i style={{backgroundColor: "#800026"}}></i>100.000.000 + 
                    </div>
                </Control>
            </Map>
  
            <CountryCard />
            {/* <input type="color" onChange={changeColor}/> */}
            <Statistics />    
        </div>
    )
}

export default World