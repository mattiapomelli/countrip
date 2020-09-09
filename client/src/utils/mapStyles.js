import { getPopulationColor, getAreaColor } from "./colors"

export default {

    default: {
        color: "#777",
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
        weight: 2
    },

    nonActive: {
        color: "#777",
        weight: 1
    },

    population: (feature) => {
        return {
            fillColor: getPopulationColor(feature.properties.population)
            }
    },

    area: (feature) => {
        return {
            fillColor: getAreaColor(feature.properties.area)
        }
    }

}