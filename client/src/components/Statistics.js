import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"

const Statistics = () => {
    const { countries, setCountries, layersRef, activeLayer, setSelected } = useContext(WorldContext)

    const selectCountry = (code) => {
        // const layers = layersRef.current.leafletElement.getLayers()
        // let clicked = layers.find(layer => layer.feature.properties.ISO_A3 === code)
        // clicked.setStyle({fillColor: "red"})
        // if(activeLayer.current) {
        //     activeLayer.current.setStyle({fillColor: "#1793d4"})    //reset the style to default
        //     setSelected(null)
        // }
        // activeLayer.current = clicked                              //set active layer to null
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