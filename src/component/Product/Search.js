import React, { useState, Fragment } from "react"
import { useNavigate } from "react-router-dom"

import MetaData from "../layout/MetaData"
import "./Search.scss"

const Search = () => {
  const [keyword, setKeyWord] = useState()

  const navigate = useNavigate()

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate("/products")
    }
  }

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="search-box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Seatch a product"
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search
