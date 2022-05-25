import React, { useContext, useEffect, useState, useRef } from 'react'
import { WorldContext } from '../context/WorldContext'
import '../css/searchbar.css'

const Searchbar = () => {
  const {
    countries,
    findLayerByCode,
    setActiveLayer,
    resetActiveLayer,
    tableRef,
  } = useContext(WorldContext)
  const [search, setSearch] = useState('')
  const prevSearch = useRef('')

  useEffect(() => {
    //se non e' cambiato il valore di ricerca, quindi solo l'ordine delle nazioni, allora non rieffettuare la ricerca
    // importante che questo effect sia eseguito (e quindi dichiarato) prima del useEffect seguente che tiene aggiorna il prevSearch
    if (prevSearch.current === search) {
      return
    }

    if (search !== '') {
      let regex = new RegExp('^' + search.toLowerCase() + '.*', 'g')
      const index = countries.findIndex((country) => {
        return regex.test(country.name.common.toLowerCase())
      }) //find position of searched country in the table

      if (index > -1) {
        const layer = findLayerByCode(countries[index].cca3)
        setActiveLayer(layer)
      } else {
        resetActiveLayer()
      }
    }
    // else {
    //     const tableBody = document.getElementsByClassName("table-body")[0]
    //     tableBody.scrollTop = 0
    // }
  }, [
    search,
    countries,
    findLayerByCode,
    setActiveLayer,
    resetActiveLayer,
    tableRef,
  ])

  useEffect(() => {
    prevSearch.current = search
  }, [search])

  const cancelSearch = () => {
    if (search !== '') {
      resetActiveLayer()
    }
    setSearch('')
  }

  return (
    <div className="search-container">
      <div className="input-container">
        <span className="material-icons search-icon">search</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country..."
        />
        <span className="material-icons cancel-icon" onClick={cancelSearch}>
          clear
        </span>
      </div>
    </div>
  )
}

export default Searchbar
