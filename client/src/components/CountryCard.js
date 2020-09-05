import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { Popup } from "react-leaflet"

const CountryCard = () => {
    const { selected, setSelected, activeLayer } = useContext(WorldContext)

    return (
        <Popup position={[selected.latlng[0], selected.latlng[1]]} onClose={() => {
                setSelected(null)
                activeLayer.current.setStyle({fillColor: "#1793d4"})    //reset the style to default
                activeLayer.current = null                              //set active layer to null
            }}>
            <div>
                {selected.name}
                {selected.population}
            </div>
        </Popup>
    )
}

export default CountryCard