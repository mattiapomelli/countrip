import React, { useContext, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/statistics.css"
import { formatNumber } from "../utils/utils"


const Statistics = () => {
    const { countries, findLayerByCode, setActiveLayer, resetActiveLayer, sortCountries, setActiveProperty, activeProperty } = useContext(WorldContext)
    const [ sortType, setSortType ] = useState({name: false, population: false, area: false})

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        resetActiveLayer()
        setActiveLayer(layer)
    }
    
    const toggleSortType = (property) => {
        setSortType({   //toggle sort type of the clicked property and set others to default value
            name: property === "name" ? !sortType.name : true,
            population: property === "population" ? !sortType.population : false,
            area: property === "area" ? !sortType.area : false,
        })
    }

    const onPropertyChange = (property) => {        //sets the whole envinronment to display data according to the selected property
        sortCountries(property, sortType[property])
        toggleSortType(property)
        if (activeProperty !== property){
            setActiveProperty(property)
        }
    }

    return (
        <div className="statistics-container">
            <div className="table-wrapper">
            <table>
                <thead className="pointer">
                    <tr className="table-head">
                        <th style={{width: "50%"}} onClick={() => {onPropertyChange("name")}}>
                            Name
                            {
                                activeProperty === "name" ?
                                <img className={`sort-icon${sortType.name ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                : <img className="sort-icon" alt="double arrow" src="/icons/doublearrow.svg"/>
                            }                      
                        </th>
                        <th style={{width: "25%"}} onClick={() => {onPropertyChange("population")}}>
                            Population
                            {
                                activeProperty === "population" ?
                                <img className={`sort-icon${!sortType.population ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                : <img className="sort-icon" alt="double arrow" src="/icons/doublearrow.svg"/>
                            }
                        </th>
                        <th style={{width: "25%"}} onClick={() => {onPropertyChange("area")}}>
                            Area <span>(km<sup>2</sup>)</span>
                            {
                                activeProperty === "area" ?
                                <img className={`sort-icon${!sortType.area ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                : <img className="sort-icon" alt="double arrow" src="/icons/doublearrow.svg"/>
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countries.map((country, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={() => selectCountry(country.alpha3Code)} className="pointer">{country.name}</td>
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