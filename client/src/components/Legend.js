import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { parameters, formatNumber } from "../utils/utils"
import mapStyles from "../utils/mapStyles"

const Legend = () => {
    const { activeProperty, theme } = useContext(WorldContext)
    let grades = parameters[activeProperty].grades
    let colors = parameters[activeProperty].colors[theme]

    return(
        <div className="legend">
            <div className="legend-title">{activeProperty}</div>
            <div className="legend-title"></div>

            {
                grades.map((grade, i) => {
                    return (
                        <div className="legend-item" key={i}>
                            <i style ={{backgroundColor: colors[i], opacity: mapStyles[theme].default.fillOpacity}}></i>
                           {formatNumber(grade)}
                            {grades[i + 1] ? " - " +  formatNumber(grades[i + 1]) : "+"}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Legend