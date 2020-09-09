function getPopulationColor (d) {
    return d > 100000000 ? '#800026' :
           d > 50000000  ? '#BD0026' :
           d > 20000000  ? '#E31A1C' :
           d > 10000000  ? '#FC4E2A' :
           d > 5000000   ? '#FD8D3C' :
           d > 2000000   ? '#FEB24C' :
           d > 1000000   ? '#FED976' :
                            '#FFEDA0';
}

function getAreaColor (d) {
    return d > 5000000 ? '#005a32' :
            d > 1000000  ? '#238b45' :
            d > 500000 ? '#41ab5d' :
            d > 100000  ? '#74c476' :
            d > 50000   ? '#a1d99b' :
            d > 10000   ? '#c7e9c0' :
            '#e5f5e0'
}

export { getPopulationColor, getAreaColor }