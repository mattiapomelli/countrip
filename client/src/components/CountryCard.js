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
                <div>Population: {selected.population}</div>
                <div>Area: {selected.area}</div>
                <div>
                    Languages: 
                    {
                        selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                    }
                </div>
                </>
            ) : <h4>Select a country</h4>
        }
        </div>
    )
}

export default CountryCard
