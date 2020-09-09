import React, { useContext, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/statistics.css"
import { formatNumber } from "../utils/utils"


const Statistics = () => {
    const { countries, findLayerByCode, setActiveLayer, resetActiveLayer, sortCountries } = useContext(WorldContext)
    const [ sortType, setSortType ] = useState({name: true, population: false, area: false})

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }

    return (
        <div className="statistics-container">
            <div className="table-wrapper">
            <table className="statistics-table">
                <thead>
                    <tr className="table-head">
                        <th style={{width: "50%"}} onClick={() => {sortCountries("name", sortType.name);
                                            setSortType({...sortType, name: !sortType.name})}}>Name</th>
                        <th onClick={() => {sortCountries("population", sortType.population);
                                            setSortType({...sortType, population: !sortType.population})}}>Population</th>
                        <th onClick={() => {sortCountries("area", sortType.area);
                                            setSortType({...sortType, area: !sortType.area})}}>Area <span>(km<sup>2</sup>)</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countries.map((country, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={() => selectCountry(country.alpha3Code)}>{country.name}</td>
                                    <td>{formatNumber(country.population)}</td>
                                    <td>{country.area ? formatNumber(country.area) : "N.A."}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Statistics