import React, { useContext, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/statistics.css"


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
            <table className="statistics-table">
            <thead>
                <tr className="table-head">
                    <th style={{width: "50%"}} onClick={() => sortCountries("name")}>Name</th>
                    <th onClick={() => {sortCountries("population", sortType.population);
                                        setSortType({...sortType, population: !sortType.population})}}>Population</th>
                    <th onClick={() => {sortCountries("area", sortType.area);
                                        setSortType({...sortType, area: !sortType.area})}}>Area</th>
                </tr>
            </thead>
            <tbody>
                {
                    countries.map((country, index) => {
                        return (
                            <tr key={index}>
                                <td onClick={() => selectCountry(country.alpha3Code)}>{country.name}</td>
                                <td>{country.population}</td>
                                <td>{country.area}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            
           

            
            
        </div>
    )
}

export default Statistics