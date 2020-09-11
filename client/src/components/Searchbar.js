import React, { useContext, useEffect, useState, useRef } from "react"
import { WorldContext } from "../context/WorldContext"

const Searchbar = () => {
    const { countries } = useContext(WorldContext)
    const [search, setSearch] = useState("")
    const prevSearch = useRef('')

    useEffect(() => {
        //remove active style
        let active = document.getElementsByClassName('active-tab') 
        while(active.length > 0){
            active[0].classList.remove('active-tab')
        }

        if (search !== ""){
            const index = countries.findIndex((country) => {
                let regex = new RegExp("^" + search + ".*", "g")
                return regex.test(country.name.toLowerCase())
            });  //find position of searched country in the table
            
            
            if(index > -1){
                const list = document.getElementById("countries-list").children
                const element = list.item(index)                                    //select <tr> element of the searched country
                element.scrollIntoView()
                let children = element.children
                for (let item of children){
                    item.classList.add('active-tab')
                }
            }
        } else {
            const tableBody = document.getElementsByClassName("table-body")[0]
            tableBody.scrollTop = 0
        }      

    }, [search, countries])

    useEffect(() => {
        prevSearch.current = search
    }, [search])

    return (
        <div className="search-container">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search.."/>
        </div>
    )
}

export default Searchbar