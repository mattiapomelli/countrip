import React, {createContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import L from "leaflet"
import countryCodes from "../utils/countryCodes"
import mapStyles from "../utils/mapStyles"

export const WorldContext = createContext()  //gives us a provider and a consumer

export default ({ children }) => {
    const [selected, setSelected] = useState(null)  //data of the current active country (the one with the popup open)
    const activeLayer = useRef(null)                //active country layer
    const layersRef = useRef()                      //ref to all layers
    const [countries, setCountries] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [activeProperty, setActiveProperty] = useState("name")  //keeps track of the currently selected property ("name", "area", "population")
    const [average, setAverage] = useState({population: 0, area: 0})
    const [slide, setSlide] = useState(1)   //current slide of country card, stored in context because must be remembered even when active country changes
    const [theme, setTheme] = useState("light")
    const themeRef  = useRef("light")

    useEffect(() => {
        themeRef.current = theme
    }, [theme])

    useEffect(() => {
        getAllCountriesData()
    }, [])

    const getCountryData = (code) => {  //get data for a specific country when selected, to display in the country card
        axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => {
            
            let density = res.data.area ? Math.ceil(res.data.population / res.data.area) : null
            setSelected({...res.data, density})
        })
        .catch(err => console.log(err))
    }

    const getAllCountriesData = () => { //get basic data for all countries to display in the table
        axios.get("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;population;area;gini;")
        .then(res => {
            /* keep only official countries, and discard non relevant ones */
            const result = res.data.filter(item => countryCodes.includes(item.alpha3Code))  
            
            /* Calculate average */
            let sum = {population: 0, area: 0.0, density: 0.0, gini: 0.0}
            let giniCount = 0   //keep track of gini count because not every country has one
            for (let i = 0; i < result.length; i ++) {
                sum.population += result[i].population
                sum.area += result[i].area ? result[i].area : 0
                sum.density += result[i].area ? result[i].population / result[i].area : 0
                if(result[i].gini){
                    sum.gini += result[i].gini
                    giniCount++
                }
            }
            setAverage({
                population: Math.ceil(sum.population / result.length),
                area: Math.ceil(sum.area / result.length),
                density: Math.ceil(sum.density / result.length),
                gini: sum.gini / giniCount
            })

            /* Sort alphabetically */
            result.sort(function(a, b){            
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

    const setActiveLayer = (layer) => { //set active layer on the map and give it the proper style
        if(!layer.active){  //in this way we don't re-fetch data and change everything if the active country is clicked
            resetActiveLayer()
            getCountryData(layer.feature.properties.ISO_A3)
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
                layer.bringToFront()
            }
            layer.setStyle(mapStyles[themeRef.current].active)
            //layer.setZIndexOffset(2000)
            layer.active = true  //attaching active property to the layer so we can use it to handle styling
            activeLayer.current = layer
        }
    }

    const resetActiveLayer = () => {    //reset active layer and bring style back to normal
        setSelected(null)
        if(activeLayer.current){
            activeLayer.current.setStyle(mapStyles[themeRef.current].nonActive)
            activeLayer.current.active = false
            activeLayer.current = null
        }
    }

    const findCountryByCode = (code) => {
        const result = countries.find(country => country.alpha3Code === code)
        return result
    }

    const sortCountries = (property, ascending) => {    //receives the property to use for the sorting
        //if the property stays the same, is only changing the sort order, so simply reverse the array, otherwise re order it with the new property
        if(activeProperty === property){
            setCountries([...countries].reverse())
        } else {
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
            layersRef.current.leafletElement.setStyle(mapStyles[theme][property])  //set the map style based on property selected for the sorting (only if the active property is changed)
        }
    }

    return (    
        <div>
            { !loaded ? <div className="loading-container"><h1>Loading...</h1></div> : 
            <WorldContext.Provider
            value={{selected, layersRef, countries, setCountries, findLayerByCode, setActiveLayer, resetActiveLayer,
                findCountryByCode, sortCountries, activeProperty, setActiveProperty, activeLayer, average, slide, setSlide, theme,
                setTheme, themeRef}}>
                { children }
            </WorldContext.Provider>
            }
        </div>
    )
}