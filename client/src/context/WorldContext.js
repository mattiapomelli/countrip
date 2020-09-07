import React, {createContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import countryCodes from "../countryCodes"

export const WorldContext = createContext()  //gives us a provider and a consumer

export default ({ children }) => {
    const [selected, setSelected] = useState(null)  //data of the current active country (the one with the popup open)
    const activeLayer = useRef(null)                //active country layer
    const layersRef = useRef()                      //ref to all layers
    const [countries, setCountries] = useState([])
    const [loaded, setLoaded] = useState(false)

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
        axios.get("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;capital;region;population;latlng;area;currencies;languages;flag")
        .then(res => {
            const result = res.data.filter(item => countryCodes.includes(item.alpha3Code))  //keep only official countries, and discard non relevant ones
            setCountries(result)
            setLoaded(true)
        })
        .catch(err => console.log(err)) 
    }

    const findLayerByCode = (code) => {
        const layers = layersRef.current.leafletElement.getLayers()
        const result = layers.find(layer => layer.feature.properties.ISO_A3 === code)
        return result
    }

    const setActiveLayer = (layer) => {
        getCountryData(layer.feature.properties.ISO_A3)
        layer.setStyle({fillColor: "red"})
        activeLayer.current = layer
    }

    const resetActiveLayer = () => {
        setSelected(null)
        if(activeLayer.current){
            activeLayer.current.setStyle({fillColor: "#1793d4"})
            activeLayer.current = null
        }
    }

    const findCountryByCode = (code) => {
        const result = countries.find(country => country.alpha3Code === code)
        return result
    }

    return (    
        <div>
            { !loaded ? <h1>Loading</h1> : 
            <WorldContext.Provider
            value={{selected, setSelected, getCountryData, activeLayer, layersRef, countries,
                setCountries, findLayerByCode, setActiveLayer, resetActiveLayer, findCountryByCode}}>
                { children }
            </WorldContext.Provider>
            }
        </div>
    )
}