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
        return d === 'RUS' ? "red" : "green"
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.ISO_A3)
        }
    }

    const sortByPopulation = () => {
        setCountries(countries.sort(function (a, b) {
            return b.population - a.population
        }))
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