import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import mapStyles from "../mapStyles"

const Statistics = () => {
    const { countries, setCountries, layersRef, findLayerByCode, setActiveLayer, resetActiveLayer } = useContext(WorldContext)

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }

    const sortCountries = (property) => {    //receives the property to use for the sorting
        const sorted = [...countries].sort(function (a, b) { //need to make a copy of the array before to sort it, otherwise it won't be detected any change in the state and the component won't re-render
            //return b[property] - a[property]
            if (b[property] < a[property]) {return -1}
            if (b[property] > a[property]) {return 1}
            return 0
        })
        //sorted.reverse()
        setCountries(sorted)
        layersRef.current.leafletElement.setStyle(mapStyles[property])  //set the map style based on property selected for the sorting

    }

    return (
        <div>
            <button onClick={() => sortCountries("name")}>Name</button>
            <button onClick={() => sortCountries("population")}>Population</button>
            <button onClick={() => sortCountries("area")}>Area</button>
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