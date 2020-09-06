import React, {createContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'

export const WorldContext = createContext()  //gives us a provider and a consumer

export default ({ children }) => {
    const [selected, setSelected] = useState(null)  //data of the current active country (the one with the popup open)
    const activeLayer = useRef(null)                //active country layer
    const layersRef = useRef()                      //ref to all layers
    const [countries, setCountries] = useState([])

    useEffect(() => {
        getAllCountriesData()
    }, [])

    const getCountryData = (code) => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => {
            setSelected(res.data)
        })
        .catch(err => console.log(err))
    }

    const getAllCountriesData = () => {
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(res => {
            setCountries(res.data)
        })
        .catch(err => console.log(err)) 
    }

    return (    
        <div>
            <WorldContext.Provider value={{selected, setSelected, getCountryData, activeLayer, layersRef, countries, setCountries}}>
                { children }
            </WorldContext.Provider>
        </div>
    )
}