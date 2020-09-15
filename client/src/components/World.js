import React, { useContext, useRef, useEffect } from "react"
import { Map, GeoJSON, Marker } from "react-leaflet"
import { Icon } from "leaflet";
import Control from "react-leaflet-control"
import countriesCoords from "../data/countriesSimplified10.json"
import "leaflet/dist/leaflet.css"
import "../css/world.css"
import { WorldContext } from "../context/WorldContext"
import mapStyles from "../utils/mapStyles"
import { parameters, formatNumber } from "../utils/utils"


const markerIcon = new Icon({
    iconUrl: "/icons/markericon.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
})

const World = () => {
    //const [color, setColor] = useState("#000")
    //const latestColor = useRef("")
    const { selected, layersRef, setActiveLayer, findCountryByCode, activeProperty, resetActiveLayer, theme } = useContext(WorldContext)
    const mapRef = useRef()
    const prevStyle = useRef(mapStyles["light"].default)

    useEffect(() => {
         //latestColor.current = color
        //Map Setup
		const map = mapRef.current.leafletElement

        map.setMinZoom(0)
        map.setMaxZoom(14)
		// let southWest = L.latLng(-85, -300),
		// northEast = L.latLng(85, 300);
		// let bounds = L.latLngBounds(southWest, northEast);
		// map.setMaxBounds(bounds)
    })

    const onCountryClick = (event) => {
        setActiveLayer(event.target)
    }

    const lightenColor = (color, percent) => {
        var num = parseInt(color.replace("#",""),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = ((num >> 8 ) & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    };

    const onCountryHover = (event) => {
        let layer = event.target;
        //get current style of layer and store it in prevStyle.current
        prevStyle.current = { color: layer.options.color, fillColor: layer.options.fillColor, fillOpacity: layer.options.fillOpacity }

        //set hover style
        layer.setStyle({
            fillColor: lightenColor(layer.options.fillColor, -15)
        })
        document.getElementById("country-hover-name").innerHTML = layer.feature.properties.name
    }

    const resetHighlight = (event) => {
        //set style back to the style before going hover it
        event.target.setStyle(prevStyle.current)
        if(event.target.active) {
            event.target.setStyle(mapStyles[theme.current].active)
        }
        document.getElementById("country-hover-name").innerHTML = ""
    }

    const onEachCountry = (country, layer) => { //run once on each feature
        const code = country.properties.ISO_A3
        const result = findCountryByCode(code)                  //find country by code of the feature
        country.properties.population = result.population       //append population data to the layer's feature so we can access it from there later
        country.properties.area = result.area
        country.properties.name = result.name

        layer.on({
            click: (event) => onCountryClick(event, code, country.properties.ADMIN),
            mouseover: onCountryHover,
            mouseout: resetHighlight
        })
    }

    const renderLegend = (property) => {
        if(property === "name"){
            return null
        }
        let items = []

        let grades = parameters[property].grades
        let colors = parameters[property].colors[theme.current]

        for (let i = 0; i < grades.length; i++){
            items.push(
                <div className="legend-item" key={i}>
                    <i style ={{backgroundColor: colors[i], opacity: mapStyles[theme.current].default.fillOpacity}}></i>
                    <span>{formatNumber(grades[i])}
                    {grades[i + 1] ? " - " +  formatNumber(grades[i + 1]) : "+"}</span>
                </div>
            )
        }

        return (<div className="legend">
                    <div className="legend-title">{property}</div>
                    {items}
                </div>)
    }

    useEffect(() => {       //pan to country selected when map is zoomed
        const map = mapRef.current.leafletElement

        if (selected){
            const north = map.getBounds().getNorth()
            const south = map.getBounds().getSouth()
            const east = map.getBounds().getEast()
            const west = map.getBounds().getWest()

            const lat = selected.latlng[0]
            const lng = selected.latlng[1]

            if(lat > north-5 || lat < south+5 || lng > east-10 || lng < west+10){ //miglioramento: dare un po meno margine del bordo effettivo per effettuare il pan
                map.panTo({lat, lng})
            } 
        }                
    }, [selected])

    // const changeColor = (event) => {
    //     setColor(event.target.value)
    // }

    const onMapClick = () => {
        let isHovering = document.getElementById("country-hover-name").innerHTML    //simple trick to understand if user clicked on the map but outside every polygon
        if(!isHovering){
            resetActiveLayer()
        }
    } 

    return (
            <Map ref={mapRef} zoom={2} center={[40, 0]} onClick={onMapClick}>
                <GeoJSON ref={layersRef} style={mapStyles[theme.current].default} data={countriesCoords.features} onEachFeature={onEachCountry}/>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
                {
                    selected && <Marker position={[selected.latlng[0], selected.latlng[1]]} icon={markerIcon}/>
                }
                <Control position="topright" className="legend-container">
                    {renderLegend(activeProperty)}
                </Control>

                <div id="country-hover-name"></div>
            </Map>    
    )
}

export default World