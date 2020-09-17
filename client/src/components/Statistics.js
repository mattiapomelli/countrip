import React, { useContext, useEffect, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/statistics.css"
import { formatNumber } from "../utils/utils"


const Statistics = () => {
    const { countries, findLayerByCode, setActiveLayer, sortCountries, setActiveProperty, activeProperty, selected } = useContext(WorldContext)
    const [ sortType, setSortType ] = useState({name: false, population: false, area: false})

    const selectCountry = (code) => {
        const layer = findLayerByCode(code)
        //resetActiveLayer()
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
        const tableBody = document.getElementsByClassName("table-body")[0]
        tableBody.scrollTop = 0
        sortCountries(property, sortType[property])
        toggleSortType(property)
        if (activeProperty !== property){
            setActiveProperty(property)
        }
    }

    useEffect(() => {
        let active = document.getElementsByClassName('active-tab') 
        while(active.length > 0){
            active[0].classList.remove('active-tab')
        }

        if(selected){
            let index = countries.findIndex(country => country.alpha3Code === selected.alpha3Code)

            const list = document.getElementById("countries-list").children
            const element = list.item(index)                                    //select <tr> element of the searched country
            element.scrollIntoView()
            let children = element.children
            for (let item of children){
                item.classList.add('active-tab')
            }
        }
     
    }, [selected, countries])

    return (
        <div className="statistics-container">
            <div className="table-container">
                <div className="table-head pointer">
                    <table>
                        <thead>
                            <tr>
                                <th>  </th>
                                <th onClick={() => {onPropertyChange("name")}}>
                                    Name
                                    {
                                        activeProperty === "name" ?
                                        <img className={`sort-icon${sortType.name ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                        : <img className="sort-icon extra-rotated" alt="double arrow" src="/icons/doublearrow.svg"/>
                                    }                      
                                </th>
                                <th onClick={() => {onPropertyChange("population")}}>
                                    Population
                                    {
                                        activeProperty === "population" ?
                                        <img className={`sort-icon${!sortType.population ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                        : <img className="sort-icon extra-rotated" alt="double arrow" src="/icons/doublearrow.svg"/>
                                    }
                                </th>
                                <th onClick={() => {onPropertyChange("area")}}>
                                    Area <span>(km<sup>2</sup>)</span>
                                    {
                                        activeProperty === "area" ?
                                        <img className={`sort-icon${!sortType.area ? ' rotated' : ''}`} alt="arrow icon" src="/icons/arrowup.svg"/>
                                        : <img className="sort-icon extra-rotated" alt="double arrow" src="/icons/doublearrow.svg"/>
                                    }
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="table-body">
                    <table>
                        <tbody id ="countries-list">
                            {
                                countries.map((country, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
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
        </div>
    )
}

export default Statistics