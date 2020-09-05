import React, {createContext, useState } from 'react'
import axios from 'axios'

export const WorldContext = createContext()  //gives us a provider and a consumer

export default ({ children }) => {
    const [selected, setSelected] = useState(null)  //data of the current active country (the one with the popup open)

    const getCountryData = (code) => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => {
            setSelected(res.data)
        })
        .catch(err => console.log(err))
    }

    return (    
        <div>
            <WorldContext.Provider value={{selected, setSelected, getCountryData}}>
                { children }
            </WorldContext.Provider>
        </div>
    )
}