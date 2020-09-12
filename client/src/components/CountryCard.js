import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/countrycard.css"
import { formatNumber } from "../utils/utils"

const CountryCard = () => {
    const { selected  } = useContext(WorldContext)

    return (
        <div className="country-card">
        {   
            selected ? (
                <>
                <div className="top-container">
                    <div className="left-container">
                        <img src={selected.flag} alt="country flag"/>
                    </div>
                    <div className="right-container">
                        <div className="main-info">
                            <div className="country-name">{selected.name}</div>
                            <div className="country-info">Capital City: {selected.capital}</div>
                        </div>
                    </div>
                </div>

                <div className="bottom-large-container">
                    <div className="bottom-container">
                        <div className="country-data">
                            <div className="data-title">Region</div>
                            <div className="data-content"> {selected.region} </div>
                        </div>
                        <div className="country-data">
                            <div className="data-title">Population</div>
                            <div className="data-content"> {formatNumber(selected.population)} </div>
                        </div>
                        <div className="country-data">
                            <div className="data-title">Area</div>
                            <div className="data-content"> {selected.area ? formatNumber(selected.area) : "N.A."} </div>
                        </div>
                    </div>
                    <div className="bottom-container">
                        <div className="country-data">
                            <div className="data-title">Languages</div>
                            <div className="data-content">
                                {
                                    selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                                }
                            </div>
                        </div>
                        <div className="country-data">
                            <div className="data-title">Currencies</div>
                            <div className="data-content">
                                {
                                    selected.currencies.map((currency, index) => { return (<span key={index}> {currency.name}</span>)})
                                }
                            </div>
                        </div>
                        <div className="country-data">
                            <div className="data-title">Timezones (UTC)</div>
                            <div className="data-content">
                                {
                                    selected.timezones.map((timezone, index) => { return (<span key={index}> {timezone.substring(3)}</span>)})
                                }
                            </div>
                        </div>
                    </div>
                </div>

                </>
            ) : (
            <div className="empty-card-container">
                <h4>Click on a country</h4>
            </div>
            )
        }
        </div>
    )
}

export default CountryCard
