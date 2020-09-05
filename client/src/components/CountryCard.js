import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"
import { Popup } from "react-leaflet"

const CountryCard = () => {
    const { selected, setSelected } = useContext(WorldContext)

    return (
        <Popup position={[selected.latlng[0], selected.latlng[1]]} onClose={() => {setSelected(null)}}>
            <div>
                {selected.name}
                {selected.population}
            </div>
        </Popup>
    )
}

export default CountryCard