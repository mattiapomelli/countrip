import React, { useState, useEffect, useRef, useContext } from "react"
import { Map, GeoJSON } from "react-leaflet"
import CountryCard from "./CountryCard"
import countries from "../data/countries.json"
import "leaflet/dist/leaflet.css"
import "../css/world.css"
import { WorldContext } from "../context/WorldContext"


let countryStyle = {
    color: "#1793d4",
    opacity: 1,
	weight: 1,	
	fillColor: "#1793d4",
    fillOpacity: 0.4,
    //dashArray: 5
}

const World = () => {
    const [color, setColor] = useState("#000")
    const latestColor = useRef("")
    const { selected, getCountryData } = useContext(WorldContext)
    //const [position, setPosition] = useState(null) //to open popup where map is clicked, pass it through props to CountryCard
    const prevActiveLayer = useRef(null)    //previously active country layer

    useEffect(() => {
        latestColor.current = color
    })

    const onCountryClick = (event, code) => {
        //setPosition({lat: event.latlng.lat, lng: event.latlng.lng})
        getCountryData(code)
        if(prevActiveLayer.current !== null){       //reset the style of the previous active country to default
            prevActiveLayer.current.setStyle({fillColor: "#1793d4"})
        }
        event.target.setStyle({                     //set the style of the current active country
             fillColor: "red"
        })
        prevActiveLayer.current = event.target
    }

    const onEachCountry = (country, layer) => {
        const code = country.properties.ISO_A3

        layer.on({
            click: (event) => onCountryClick(event, code)
            //mouseover
        })
    }

    const changeColor = (event) => {
        setColor(event.target.value)
    }

    return (
        <div>
            <Map zoom={2} center={[40, 0]}>
                <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry}/>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
                {
                    selected && <CountryCard/>
                }
            </Map>
            <input type="color" onChange={changeColor}/>
        </div>
    )
}

export default World