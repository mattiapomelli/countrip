import React, { useContext, useRef, useEffect, useState } from 'react'
import { Map, GeoJSON, Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import Control from 'react-leaflet-control'
import countriesCoords from '../data/countries.json'
import 'leaflet/dist/leaflet.css'
import '../css/world.css'
import { WorldContext } from '../context/WorldContext'
import Legend from './Legend'
import mapStyles from '../utils/mapStyles'

const markerIcon = new Icon({
  iconUrl: '/icons/markericon.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

const World = () => {
  //const [color, setColor] = useState("#000")
  //const latestColor = useRef("")
  const {
    selected,
    layersRef,
    setActiveLayer,
    findCountryByCode,
    activeProperty,
    resetActiveLayer,
    theme,
    setSlide,
    themeRef,
  } = useContext(WorldContext)
  const mapRef = useRef()
  const prevStyle = useRef(mapStyles['light'].default)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    //Map Setup
    const map = mapRef.current.leafletElement

    map.setMinZoom(0)
    map.setMaxZoom(14)
  })

  const onCountryClick = (event) => {
    //tableRef.current.classList.add('smooth-scroll')
    setActiveLayer(event.target)
  }

  const lightenColor = (color, percent) => {
    var num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  const onCountryHover = (event) => {
    setIsHovering(true)
    //if device is touchscreen don't handle hover state
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      return
    }
    let layer = event.target
    //get current style of layer and store it in prevStyle.current
    prevStyle.current = {
      color: layer.options.color,
      fillColor: layer.options.fillColor,
      fillOpacity: layer.options.fillOpacity,
    }

    //set hover style
    layer.setStyle({
      fillColor: lightenColor(layer.options.fillColor, -15),
    })
    document.getElementById('country-hover-name').innerHTML =
      layer.feature.properties.name
  }

  const resetHighlight = (event) => {
    setIsHovering(false)
    //set style back to the style before going hover it
    event.target.setStyle(prevStyle.current)
    if (event.target.active) {
      event.target.setStyle(mapStyles[themeRef.current].active)
    }
    document.getElementById('country-hover-name').innerHTML = ''
  }

  const onEachCountry = (country, layer) => {
    //run once on each feature
    const code = country.properties.ISO_A3
    const result = findCountryByCode(code) //find country by code of the feature
    if (!result) return
    country.properties.population = result.population //append population data to the layer's feature so we can access it from there later
    country.properties.area = result.area
    country.properties.name = result.name.common

    layer.on({
      click: (event) => onCountryClick(event, code, country.properties.ADMIN),
      mouseover: onCountryHover,
      mouseout: resetHighlight,
    })
  }

  useEffect(() => {
    //pan to country selected when map is zoomed
    const map = mapRef.current.leafletElement

    if (selected) {
      const north = map.getBounds().getNorth()
      const south = map.getBounds().getSouth()
      const east = map.getBounds().getEast()
      const west = map.getBounds().getWest()

      const lat = selected.latlng[0]
      const lng = selected.latlng[1]

      if (
        lat > north - 5 ||
        lat < south + 5 ||
        lng > east - 10 ||
        lng < west + 10
      ) {
        //miglioramento: dare un po meno margine del bordo effettivo per effettuare il pan
        map.panTo({ lat, lng })
      }
    }
  }, [selected])

  const onMapClick = () => {
    //let isHovering = document.getElementById("country-hover-name").innerHTML    //simple trick to understand if user clicked on the map but outside every polygon
    if (!isHovering && selected) {
      //se c'e una nazione selezionata e si clicca fuori dal layer del monfo resetta activelayer
      resetActiveLayer()
      setSlide(1)
      //const tableBody = document.getElementsByClassName("table-body")[0]    //scroll table to top when deselecting country
      //tableBody.scrollTop = 0
    }
  }

  return (
    <Map ref={mapRef} zoom={2} center={[40, 0]} onClick={onMapClick}>
      <GeoJSON
        ref={layersRef}
        style={mapStyles[theme].default}
        data={countriesCoords.features}
        onEachFeature={onEachCountry}
      />
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/> */}
      {selected && (
        <Marker
          position={[selected.latlng[0], selected.latlng[1]]}
          icon={markerIcon}
        />
      )}
      <Control position="topright" className="legend-container">
        {activeProperty !== 'name' && <Legend />}
      </Control>

      <div id="country-hover-name"></div>
    </Map>
  )
}

export default World
