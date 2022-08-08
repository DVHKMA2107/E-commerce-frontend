import React, { useState, useEffect, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"
import { fetchAllProduct, clearError } from "../../redux/productSlice"
import ProductCard from "../Home/ProductCard"
import Loading from "../layout/Loading/Loading"
import Pagination from "react-js-pagination"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import "./Products.scss"
import MetaData from "../layout/MetaData"

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smartphone",
]

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()
  const alert = useAlert()
  const { keyword } = useParams()

  const {
    products,
    productCount,
    loading,
    error,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }
    dispatch(fetchAllProduct({ keyword, currentPage, price, category, rating }))
  }, [dispatch, keyword, currentPage, price, category, rating, error, alert])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="products-heading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filter-box">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => setRating(newRating)}
                aria-labelledby="continuos-slide"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="pagination-box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                nextPageText="next"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                linkClass="page-link"
                itemClass="page-item"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products
