import React, { useContext } from "react"
import { WorldContext } from "../context/WorldContext"

const CountryCard = () => {
    const { selected } = useContext(WorldContext)

    return (
        <div>
            {selected.name}
            {selected.population}
        </div>
    )
}

export default CountryCard