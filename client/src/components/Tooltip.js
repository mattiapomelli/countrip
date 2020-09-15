import React from "react"
import "../css/tooltip.css"

const Tooltip = () => {

    const toggleTooltip = (expandState) => {
        const tooltip = document.querySelector('.notify-container')
        //const alert = document.querySelector('.alert')
        //const cancel = document.querySelector('.cancel')

        if(expandState) {
            tooltip.style.transform = 'scale(1) translateX(-50%)'
            //alert.style.display = 'none'
            //cancel.style.display = 'block'
        } else {
            tooltip.style.transform = 'scale(0) translateX(-50%)'
            //alert.style.display = 'block'
            //cancel.style.display = 'none'
        }

    }

    return (
        <div className="tooltip-container">
            <svg viewBox="0 0 50 50" fill="none" className="alert" onMouseEnter={() => toggleTooltip(true)} onMouseLeave={() => toggleTooltip(false)}>
                <g id="exit">
                    <circle cx="25" cy="25" r="25" fill="#F1B900"/>
                    <path d="M22 10H28V16H22V10Z" fill="white"/>
                    <path d="M22 20H28V40H22V20Z" fill="white"/>
                </g>
            </svg>

            {/* <svg viewBox="0 0 50 50" fill="none" className="cancel" onMouseLeave={() => toggleTooltip(false)}>
                <g id="alert">
                    <circle cx="25" cy="25" r="25" fill="#F26F52"/>
                    <line x1="13.3474" y1="12.6048" x2="36.8952" y2="36.1526" stroke="white" stroke-width="6"/>
                    <line x1="13.1048" y1="36.1526" x2="36.6526" y2="12.6048" stroke="white" stroke-width="6"/>
                </g>
            </svg> */}

            <div className="notify-container">
                The Gini coefficient is a measure of statistical dispersion intended to represent the income
                inequality or wealth inequality within a nation or any other group of people
            </div>
        </div>

    )
}

export default Tooltip