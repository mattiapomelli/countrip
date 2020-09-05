import React, {createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const WorldContext = createContext()  //gives us a provider and a consumer

export default ({ children }) => {
    const [selected, setSelected] = useState(null)

    return (    
        <div>
            <WorldContext.Provider value={{selected, setSelected}}>
                { children }
            </WorldContext.Provider>
        </div>
    )
}