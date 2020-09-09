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
import { getPopulationColor } from "../utils/colors"

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

    const renderLegend = () => {
        let grades = [0, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000]
        let items = []

        for (const [index, value] of grades.entries()){
            items.push(<div className="legend-item">
                <i style ={{backgroundColor: getPopulationColor(value + 1)}}></i>
                <span>{value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                {grades[index + 1] ? " - " +  grades[index + 1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : "+"}</span>
            </div>)
        }
        return items
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
                        {renderLegend()}

                       {/*  <div className="legend-item"><i style={{backgroundColor: "#FED976"}}></i><span>1.000.000 - 2.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#FEB24C"}}></i><span>2.000.000 - 5.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#FD8D3C"}}></i><span>5.000.000 - 10.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#FC4E2A"}}></i><span>10.000.000 - 20.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#E31A1C"}}></i><span>20.000.000 - 50.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#BD0026"}}></i><span>50.000.000 - 100.000.000</span></div>
                        <div className="legend-item"><i style={{backgroundColor: "#800026"}}></i><span>100.000.000 + </span></div> */}
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