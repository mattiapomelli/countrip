import React, { useContext, useEffect, useState, useRef } from "react"
import { WorldContext } from "../context/WorldContext"
import "../css/searchbar.css"

const Searchbar = () => {
    const { countries, findLayerByCode, setActiveLayer, resetActiveLayer } = useContext(WorldContext)
    const [search, setSearch] = useState("")
    const prevSearch = useRef('')

    useEffect(() => {
        //se non e' cambiato il valore di ricerca, quindi solo l'ordine delle nazioni, allora non rieffettuare la ricerca
        // importante che questo effect sia eseguito (e quindi dichiarato) prima del useEffect seguente che tiene aggiorna il prevSearch
        if(prevSearch.current === search){  
            return
        }

        if (search !== ""){
            const index = countries.findIndex((country) => {
                let regex = new RegExp("^" + search + ".*", "g")
                return regex.test(country.name.toLowerCase())
            });  //find position of searched country in the table
                      
            if(index > -1){
                const layer = findLayerByCode(countries[index].alpha3Code)
                setActiveLayer(layer)

            } else {
                resetActiveLayer()
            }
        }
        // else {
        //     const tableBody = document.getElementsByClassName("table-body")[0]
        //     tableBody.scrollTop = 0
        // }      

    }, [search, countries, findLayerByCode, setActiveLayer, resetActiveLayer])

    useEffect(() => {
        prevSearch.current = search
    }, [search])

    const cancelSearch = () => {
        if(search !== ''){
            resetActiveLayer()
        }
        setSearch('')
    }

    return (
        <div className="search-container">
            <span className="material-icons search-icon">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search.."/>
            <span className="material-icons cancel-icon" onClick={cancelSearch}>clear</span>
        </div>
    )
}

export default Searchbar