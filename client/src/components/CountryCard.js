import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/countrycard.css"

const CountryCard = () => {
    const { selected  } = useContext(WorldContext)

    return (
        <div className="country-card">
        {   
            selected ? (
                <>
                <img src={selected.flag} alt="country flag"/>
                <div>{selected.name}</div>
                <div>Capital City: {selected.capital}</div>
                <div>Population: {selected.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>  {/* puts a dot every three digits for more readability */}
                <div>Region: {selected.region}</div>
                <div>Area: {selected.area.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                <div>
                    Languages: 
                    {
                        selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                    }
                </div>
                <div>
                    Currencies: 
                    {
                        selected.currencies.map((currency, index) => { return (<span key={index}> {currency.name}</span>)})
                    }
                </div>
                <div>
                    Timezones: 
                    {
                        selected.timezones.map((timezone, index) => { return (<span key={index}> {timezone}</span>)})
                    }
                </div>

                </>
            ) : <h4>Select a country</h4>
        }
        </div>
    )
}

export default CountryCard
