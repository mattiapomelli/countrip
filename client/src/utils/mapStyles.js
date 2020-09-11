import { getColor } from "./utils"

export default {

    default: {
        color: "#555",
        weight: 1,
        opacity: 1,	
        fillOpacity: 0.8,
        fillColor: "#1793d4", 
        //dashArray: 5
    },

    name: {                     //default style: active when countries are sorted by name
        fillColor: "#1793d4",   
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
            fillColor: getColor(feature.properties.population, "population")
            }
    },

    area: (feature) => {
        return {
            fillColor: getColor(feature.properties.area, "area")
        }
    }

}