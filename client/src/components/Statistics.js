import React, { useContext, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/statistics.css"
import { formatNumber } from "../utils/utils"


const Statistics = () => {
    const { countries, findLayerByCode, setActiveLayer, resetActiveLayer, sortCountries, setActiveProperty } = useContext(WorldContext)
    const [ sortType, setSortType ] = useState({name: true, population: false, area: false})

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }
    
    const toggleSortType = (property) => {
        setSortType({...sortType, [property]: !sortType[property]})
    }

    const onPropertyChange = (property) => {        //sets the whole envinronment to display data according to the selected property
        sortCountries(property, sortType[property])
        toggleSortType(property)
        setActiveProperty(property)
    }

    return (
        <div className="statistics-container">
            <div className="table-wrapper">
            <table>
                <thead>
                    <tr className="table-head">
                        <th style={{width: "50%"}} onClick={() => {onPropertyChange("name")}}>Name</th>
                        <th onClick={() => {onPropertyChange("population")}}>Population</th>
                        <th onClick={() => {onPropertyChange("area")}}>Area <span>(km<sup>2</sup>)</span></th>
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