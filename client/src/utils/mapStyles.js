import { getColor } from "./utils"

export default {

    light: {
        default: {
            color: "#555",
            weight: 1,
            opacity: 1,	
            fillOpacity: 0.8,
            fillColor: "#abedcb", 
            //dashArray: 5
        },
    
        name: {                     //default style: active when countries are sorted by name
            fillColor: "#abedcb",   
        },
    
        active: {
            color: "#222",
            weight: 2,
            zIndex: 800,
            fillOpacity: 0.95
        },
    
        nonActive: {
            color: "#555",
            weight: 1,
            fillOpacity: 0.8
        },
    
        hover: {
            fillOpacity: 1,
        },
    
        population: (feature) => {
            return {
                fillColor: getColor(feature.properties.population, "population", "light")
                }
        },
    
        area: (feature) => {
            return {
                fillColor: getColor(feature.properties.area, "area", "light")
            }
        }
    },

    dark: {
        default: {
            color: "#dbdbdb",
            weight: 1,
            opacity: 1,	
            fillOpacity: 0.8,
            fillColor: "#abedcb", 
            //dashArray: 5
        },
    
        name: {                     //default style: active when countries are sorted by name
            fillColor: "#83dde6",   
        },
    
        active: {
            color: "#fff",
            weight: 2,
            zIndex: 800,
            fillOpacity: 0.95
        },
    
        nonActive: {
            color: "#dbdbdb",
            weight: 1,
            fillOpacity: 0.8
        },
    
        hover: {
            fillOpacity: 1,
        },
    
        population: (feature) => {
            return {
                fillColor: getColor(feature.properties.population, "population", "dark")
                }
        },
    
        area: (feature) => {
            return {
                fillColor: getColor(feature.properties.area, "area", "dark")
            }
        }
    }

}