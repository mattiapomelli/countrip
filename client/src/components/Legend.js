import React, { useCallback, useContext, useEffect } from "react"
import { WorldContext } from "../context/WorldContext"
import { parameters, formatNumber } from "../utils/utils"
import mapStyles from "../utils/mapStyles"

const Legend = () => {
    const { activeProperty, theme } = useContext(WorldContext)
    let grades = parameters[activeProperty].grades
    let colors = parameters[activeProperty].colors[theme.current]

    return(
        <div className="legend">
            <div className="legend-title">{activeProperty}{theme.current}</div>
            {
                grades.map((grade, i) => {
                    return (
                        <div className="legend-item" key={i}>
                            <i style ={{backgroundColor: colors[i], opacity: mapStyles[theme.current].default.fillOpacity}}></i>
                            <span>{formatNumber(grade)}
                            {grades[i + 1] ? " - " +  formatNumber(grades[i + 1]) : "+"}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Legend