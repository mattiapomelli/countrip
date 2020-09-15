const parameters = {
    area: {
        grades: [0, 10000, 50000, 100000, 500000, 1000000, 2000000, 5000000],
        //colors: ['#dd3497', '#f768a1', '#fa9fb5', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#005a32'],
        colors: {
            light: ['#dd4f33', '#f79a67', '#facd9f', '#cff5d5', '#85e198', '#41bc5f', '#209249', '#003e5a'],
            dark: ['#fff', '#f79a67', '#fff', '#cff5d5', '#85e198', '#fff', '#209249', '#003e5a'],
        }
    },
    population: {
        grades: [0, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000],
        colors: {
            light: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
            dark: ['#dd4f33', '#000', '#facd9f', '#000', '#85e198', '#41bc5f', '#000', '#003e5a'],
        }
    }
}

function getColor(d, property, theme) {
    let grades = parameters[property].grades
    let colors = parameters[property].colors[theme]
    for(let i = grades.length - 1; i >= 0; i--) {
        if (d >= grades[i]) {
            return colors[i]
        }
    }
    return '#222'
} 

function formatNumber (number) {    //puts three dot every three digits in a number for more readability
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

export { getColor, parameters, formatNumber }