import { getColor } from "./utils"

export default {

    default: {
        color: "#777",
        weight: 1,
        opacity: 1,	
        fillOpacity: 1,
        fillColor: "#1793d4", 
        //dashArray: 5
    },

    name: {                     //default style: active when countries are sorted by name
        fillColor: "#1793d4",   
    },

    active: {
        color: "#222",
        weight: 2
    },

    nonActive: {
        color: "#777",
        weight: 1
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