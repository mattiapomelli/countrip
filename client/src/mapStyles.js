export default {

    default: {
        color: "#777",
        weight: 1,
        opacity: 1,	
        fillOpacity: 0.6,
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
            fillColor: (feature.properties.population > 100000000 ? '#800026' :
                        feature.properties.population > 50000000  ? '#BD0026' :
                        feature.properties.population > 20000000 ? '#E31A1C' :
                        feature.properties.population > 10000000  ? '#FC4E2A' :
                        feature.properties.population > 5000000   ? '#FD8D3C' :
                        feature.properties.population > 2000000   ? '#FEB24C' :
                        feature.properties.population > 1000000   ? '#FED976' :
                                                                    '#FFEDA0')
            }
    },

    area: (feature) => {
        return {
            fillColor: (feature.properties.area > 5000000 ? '#005a32' :
                        feature.properties.area > 1000000  ? '#238b45' :
                        feature.properties.area > 500000 ? '#41ab5d' :
                        feature.properties.area > 100000  ? '#74c476' :
                        feature.properties.area > 50000   ? '#a1d99b' :
                        feature.properties.area > 10000   ? '#c7e9c0' :
                        '#e5f5e0')                                   
            }
    }

}