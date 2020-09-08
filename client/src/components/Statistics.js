import React, { useContext, useState } from "react"
import { WorldContext } from "../context/WorldContext"


const Statistics = () => {
    const { countries, findLayerByCode, setActiveLayer, resetActiveLayer, sortCountries } = useContext(WorldContext)
    const [ sortType, setSortType ] = useState({population: false, area: false})

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }

    return (
        <div>
            <button onClick={() => sortCountries("name")}>Name</button>
            <button onClick={() => {sortCountries("population", sortType.population);
                                    setSortType({...sortType, population: !sortType.population})}}>Population</button>

            <button onClick={() => {sortCountries("area", sortType.area);
                                    setSortType({...sortType, area: !sortType.area})}}>Area</button>
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