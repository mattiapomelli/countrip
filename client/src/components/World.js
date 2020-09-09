import React, { useContext } from "react"
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
import { parameters } from "../utils/utils"

const markerIcon = new Icon({
    iconUrl: "/icons/markericon.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
})

const World = () => {
    //const [color, setColor] = useState("#000")
    //const latestColor = useRef("")
    const { selected, layersRef, setActiveLayer, findCountryByCode, activeProperty } = useContext(WorldContext)

    // useEffect(() => {
    //     latestColor.current = color
    // })

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

    const renderLegend = (property) => {
        if(property === "name"){
            return null
        }
        let items = []

        let grades = parameters[property].grades
        let colors = parameters[property].colors

        for (let i = 0; i < grades.length; i++){
            items.push(
                <div className="legend-item">
                    <i style ={{backgroundColor: colors[i]}}></i>
                    <span>{grades[i]}
                    {grades[i + 1] ? " - " +  grades[i + 1] : "+"}</span>
                </div>
            )
        }

        return (<div className="legend">{items}</div>)
    }

    // const changeColor = (event) => {
    //     setColor(event.target.value)
    // }

    return (
        <div className="main-container">
            <Map zoom={2} center={[40, 0]} onclick={() => console.log("map")}>
                <GeoJSON ref={layersRef} style={mapStyles.default} data={countriesCoords.features} onEachFeature={onEachCountry}/>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
                {
                    selected && <Marker position={[selected.latlng[0], selected.latlng[1]]} icon={markerIcon}/>
                }
                <Control position="topright">
                    {renderLegend(activeProperty)}
                </Control>
            </Map>
  
            <CountryCard />
            {/* <input type="color" onChange={changeColor}/> */}
            <Statistics />    
        </div>
    )
}

export default World