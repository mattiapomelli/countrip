const parameters = {
    population: {
        grades: [0, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000],
        colors: ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
    },
    area: {
        grades: [0, 10000, 50000, 100000, 500000, 1000000, 5000000],
        colors: ['#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32']
    }
}

function getColor(d, property) {
    let grades = parameters[property].grades
    let colors = parameters[property].colors
    for(let i = grades.length - 1; i >= 0; i--) {
        if (d >= grades[i]) {
            return colors[i]
        }
    }
} 

function formatNumber (number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

export { getColor, parameters, formatNumber }