import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { CgMouse } from "react-icons/cg"
import { clearError, fetchAllProduct } from "../../redux/productSlice"
import ProductCard from "./ProductCard"
import MetaData from "../layout/MetaData"
import Loading from "../layout/Loading/Loading"
import "./Home.scss"

const Home = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { loading, products, productCount, error } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }
    dispatch(fetchAllProduct({}))
  }, [dispatch, error, alert])
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h1 className="home-heading">Featured Products</h1>
      <div id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </Fragment>
  )
}

export default Home
