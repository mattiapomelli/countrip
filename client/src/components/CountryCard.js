import React, { useContext, useEffect, useState } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/countrycard.css"
import { formatNumber } from "../utils/utils"

const CountryCard = () => {
    const { selected, average } = useContext(WorldContext)
    const [ slide, setSlide ] = useState(1) // current slide of slideshow

    useEffect(() => {   

        calculateWidth("population")
        calculateWidth("area")
        calculateWidth("density")
        calculateWidth("gini")

    })

    const calculateWidth = (property) => {
        const selectedDiv = document.getElementById(`selected-${property}`)
        const averageDiv = document.getElementById(`average-${property}`) 

        if(selected[property] > average[property]){
            selectedDiv.style.width = "100%"
            averageDiv.style.width = `${(average[property]*100) / selected[property]}%`
        } else {
            averageDiv.style.width = "100%"
            selectedDiv.style.width = `${(selected[property]*100) / average[property]}%`
        }

    }

    useEffect(() => {
        const element = document.getElementById("inner")
        element.style.marginLeft = `-${(slide-1)*100}%`


        document.getElementById("left-arrow").disabled = (slide === 1)  //disable left arrow if current slide is the first one
        document.getElementById("right-arrow").disabled = (slide === 3) //disable right arrow if current slide is the last one

    }, [slide])

    return (
        <>
            <div className="card-header flex-container">
                <div className="header-left flex-container">
                    <img src={selected.flag} alt="country flag"/>
                </div>
                <div className="header-right flex-container">
                    <div className="main-info">
                        <div className="country-name">{selected.name}</div>
                        <div className="country-info">Capital City: {selected.capital}</div>
                        <div className="country-info">Region: {selected.region}</div>
                    </div>
                </div>
            </div>

            {/* SLIDER */}
            <div className="card-body flex-container">

                <button className="slide-arrow" id="left-arrow" onClick={(e) => {if(!e.currentTarget.disabled){setSlide(slide - 1)}}}>
                    <img src="/icons/slide-arrow-left.svg" alt="slide arrow left"></img>
                </button>

                <div id="slider">       
                    <div id="overflow">
                        <div id="inner">
                            <div className="slide slide_1">
                                <div className="slide-content">
                                        <div className="card-legend flex-container">
                                            <i style={{backgroundColor:"#c4c4c4"}}></i><span>Average</span>
                                            <i style={{backgroundColor:"#6671DA"}}></i><span>{selected.name}</span>
                                        </div>

                                        <div className="data-row flex-container">
                                            <div className="data-item column-1">
                                                <h5>Population</h5>
                                                <h1>{formatNumber(selected.population)}</h1>
                                                <div className="country-line" id="selected-population"></div>
                                                <div className="average-line" id="average-population"></div>
                                            </div>
                                            <div className="data-item column-2">
                                                <h5>Area (km2)</h5>
                                                <h1>{selected.area ? formatNumber(selected.area) : "N.A."}</h1>
                                                <div className="country-line" id="selected-area"></div>
                                                <div className="average-line" id="average-area"></div>
                                            </div>
                                        </div>

                                        <div className="data-row flex-container">
                                            <div className="data-item column-1">
                                                <h5>Density (P/km2)</h5>
                                                <h1>{selected.density ? formatNumber(selected.density) : "N.A."}</h1>
                                                <div className="country-line" id="selected-density"></div>
                                                <div className="average-line" id="average-density"></div>
                                            </div>
                                            <div className="data-item column-2">
                                                <h5>Gini</h5>
                                                <h1>{selected.gini ? selected.gini : "N.A."}</h1>
                                                <div className="country-line" id="selected-gini"></div>
                                                <div className="average-line" id="average-gini"></div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div className="slide slide_2">
                                <div className="slide-content">
                                    <div className="data-row flex-container">
                                        <div className="data-item column-1">
                                            <h5>Languages</h5>
                                            <h4>
                                                {
                                                    selected.languages.map((language, index) => { return (<span key={index}> {language.name}</span>)})
                                                }
                                            </h4>
                                        </div>
                                        <div className="data-item column-2">
                                            <h5>Currencies</h5>
                                            <h4>
                                                {
                                                    selected.currencies.map((currency, index) => { return (<span key={index}> {currency.name}</span>)})
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slide slide_3">
                                <div className="slide-content">
                                        <h2>Slide 3</h2>
                                        <h2>Slide 3</h2>
                                        <h2>Slide 3</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bullets flex-container">
                        <i className={`${slide === 1 ? "bullet-active" : ""}`} onClick={() => setSlide(1)}></i>
                        <i className={`${slide === 2 ? "bullet-active" : ""}`} onClick={() => setSlide(2)}></i>
                        <i className={`${slide === 3 ? "bullet-active" : ""}`} onClick={() => setSlide(3)}></i>
                    </div>
                </div>

                <button className="slide-arrow" id="right-arrow" onClick={(e) => {if(!e.currentTarget.disabled){setSlide(slide + 1)}}}>
                    <img src="/icons/slide-arrow-right.svg" alt="slide arrow right"></img>
                </button>

            </div>

            
            

            {/*  */}
        </>
    )
}

export default CountryCard
