import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"

const Statistics = () => {
    const { countries, layersRef, activeLayer, setSelected } = useContext(WorldContext)

    const selectCountry = (code) => {
        const layers = layersRef.current.leafletElement.getLayers()
        let clicked = layers.find(layer => layer.feature.properties.ISO_A3 === code)
        clicked.setStyle({fillColor: "red"})
        if(activeLayer.current) {
            activeLayer.current.setStyle({fillColor: "#1793d4"})    //reset the style to default
            setSelected(null)
        }
        activeLayer.current = clicked                              //set active layer to null
    }

    return (
        <div>
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