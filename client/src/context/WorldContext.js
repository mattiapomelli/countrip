import React, {createContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import countryCodes from "../utils/countryCodes"
import mapStyles from "../utils/mapStyles"

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
            result.sort(function(a, b){             //sort results alphabetically
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
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
        resetActiveLayer()
        getCountryData(layer.feature.properties.ISO_A3)
        layer.bringToFront()
        layer.setStyle(mapStyles.active)
        //layer.feature.properties.active = true  //attaching active property to the feature so that we can use it for styling
        activeLayer.current = layer
    }

    const resetActiveLayer = () => {
        setSelected(null)
        if(activeLayer.current){
            activeLayer.current.setStyle(mapStyles.nonActive)
            //activeLayer.current.feature.properties.active = false
            activeLayer.current = null
        }
    }

    const findCountryByCode = (code) => {
        const result = countries.find(country => country.alpha3Code === code)
        return result
    }

    const sortCountries = (property, ascending) => {    //receives the property to use for the sorting
        const sorted = [...countries].sort(function (a, b) { //need to make a copy of the array before to sort it, otherwise it won't be detected any change in the state and the component won't re-render
            if(!a[property]) a[property] = 0;   //small fix to deal with countries which have no area or population reported
            if(!b[property]) b[property] = 0;

            if (b[property] < a[property]) {return -1}
            if (b[property] > a[property]) {return 1}
            return 0
        })
        if(ascending){
            sorted.reverse()
        }
        setCountries(sorted)
        layersRef.current.leafletElement.setStyle(mapStyles[property])  //set the map style based on property selected for the sorting
    }

    return (    
        <div>
            { !loaded ? <h1>Loading</h1> : 
            <WorldContext.Provider
            value={{selected, layersRef, countries, setCountries, findLayerByCode, setActiveLayer, resetActiveLayer,
                findCountryByCode, sortCountries}}>
                { children }
            </WorldContext.Provider>
            }
        </div>
    )
}