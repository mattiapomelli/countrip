import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { Popup } from "react-leaflet"
import "../css/countrypopup.css"

const CountryPopup = () => {
    const { selected, resetActiveLayer } = useContext(WorldContext)

    return (
        <Popup position={[selected.latlng[0], selected.latlng[1]]} onClose={() => {
                resetActiveLayer()
            }}>
            <div className="country-name">{selected.name}</div>
        </Popup>
    )
}

export default CountryPopup