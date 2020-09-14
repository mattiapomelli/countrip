import React, { useContext, useEffect } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/countrycard.css"
import { formatNumber } from "../utils/utils"

const CountryCard = () => {
    const { selected, average } = useContext(WorldContext)

    useEffect(() => {   

        calculateWidth("population")
        calculateWidth("area")
        calculateWidth("density")
        calculateWidth("gini")

    })

    const calculateWidth = (property) => {
        const selectedDiv = document.getElementById(`selected-${property}`)
        const averageDiv = document.getElementById(`average-${property}`) 

        if(selected[property] > average[property]){
            selectedDiv.style.width = "100%"
            averageDiv.style.width = `${(average[property]*100) / selected[property]}%`
        } else {
            averageDiv.style.width = "100%"
            selectedDiv.style.width = `${(selected[property]*100) / average[property]}%`
        }

    }

    return (
        <>
            <div className="card-header flex-container">
                <div className="header-left flex-container">
                    <img src={selected.flag} alt="country flag"/>
                </div>
                <div className="header-right flex-container">
                    <div className="main-info">
                        <div className="country-name">{selected.name}</div>
                        <div className="country-info">Capital City: {selected.capital}</div>
                        <div className="country-info">Region: {selected.region}</div>
                    </div>
                </div>
            </div>

            <div className="card-legend flex-container">
                <i style={{backgroundColor:"#c4c4c4"}}></i><span>Average</span>
                <i style={{backgroundColor:"#6671DA"}}></i><span>{selected.name}</span>
            </div>

            <div className="data-row flex-container">
                <div className="data-item column-1">
                    <h5>Population</h5>
                    <h1>{formatNumber(selected.population)}</h1>
                    <div className="country-line" id="selected-population"></div>
                    <div className="average-line" id="average-population"></div>
                </div>
                <div className="data-item column-2">
                    <h5>Area (km2)</h5>
                    <h1>{selected.area ? formatNumber(selected.area) : "N.A."}</h1>
                    <div className="country-line" id="selected-area"></div>
                    <div className="average-line" id="average-area"></div>
                </div>
            </div>

            <div className="data-row flex-container">
                <div className="data-item column-1">
                    <h5>Density (P/km2)</h5>
                    <h1>{selected.density ? formatNumber(selected.density) : "N.A."}</h1>
                    <div className="country-line" id="selected-density"></div>
                    <div className="average-line" id="average-density"></div>
                </div>
                <div className="data-item column-2">
                    <h5>Gini</h5>
                    <h1>{selected.gini ? selected.gini : "N.A."}</h1>
                    <div className="country-line" id="selected-gini"></div>
                    <div className="average-line" id="average-gini"></div>
                </div>
            </div>

            {/* <div className="data-row flex-container">
                <div className="data-item column-1">
                    <h5>Languages</h5>
                    <h4>
                        {
                            selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                        }
                    </h4>
                </div>
                <div className="data-item column-2">
                    <h5>Currencies</h5>
                    <h4>
                        {
                            selected.currencies.map((currency, index) => { return (<span key={index}> {currency.name}</span>)})
                        }
                    </h4>
                </div>
            </div> */}
        </>
    )
}

export default CountryCard
