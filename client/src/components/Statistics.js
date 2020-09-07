import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"

const Statistics = () => {
    const { countries, setCountries, layersRef, findLayerByCode, setActiveLayer, resetActiveLayer } = useContext(WorldContext)

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }

    function getColor(d) {
        return d > 100000000 ? '#800026' :
           d > 50000000  ? '#BD0026' :
           d > 20000000 ? '#E31A1C' :
           d > 10000000  ? '#FC4E2A' :
           d > 5000000   ? '#FD8D3C' :
           d > 2000000   ? '#FEB24C' :
           d > 1000000   ? '#FED976' :
                      '#FFEDA0';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.population)
        }
    }

    const sortByPopulation = () => {
        const sorted = [...countries].sort(function (a, b) { //need to make a copy of the array before to sort it, otherwise it won't be detected any change in the state and the component won't re-render
            return b.population - a.population
        })
        setCountries(sorted)
        layersRef.current.leafletElement.setStyle(style)

    }

    return (
        <div>
            <button onClick={sortByPopulation}>Sort</button>
            {
                countries.map((country, index) => {
                    return (
                        <div key={index} onClick={() => selectCountry(country.alpha3Code)}>{country.name}</div>
                    )
                })
            }
        </div>
    )
}

export default Statistics