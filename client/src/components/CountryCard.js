import React, { useEffect, useState } from "react"
import axios from "axios"

const CountryCard = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        console.log(props)
        axios.get(`https://restcountries.eu/rest/v2/alpha/RUS`)
        .then(res => {
            setData(res.data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }, [props])

    return (
        <h1>{props.code}</h1>
    )
}

export default CountryCard