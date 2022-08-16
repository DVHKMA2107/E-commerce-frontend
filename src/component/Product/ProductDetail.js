import React, { Fragment, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetail, clearError } from "../../redux/productSlice"
import { useAlert } from "react-alert"
import Loading from "../layout/Loading/Loading"
import { addItemToCart } from "../../redux/cartSlice"

import ReviewCard from "./ReviewCard"
import "./ProductDetail.scss"
import MetaData from "../layout/MetaData"

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const alert = useAlert()

  const { productDetail, loading, error } = useSelector(
    (state) => state.product
  )
  const { id } = useParams()

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.size < 600 ? 20 : 25,
    value: productDetail.rating,
    isHalf: true,
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) return
    setQuantity((prev) => prev - 1)
  }

  const increaseQuantity = () => {
    if (productDetail.Stock <= quantity) return
    setQuantity((prev) => prev + 1)
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart({ id, quantity }))
    alert.success("Item added to cart")
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }
    dispatch(getProductDetail(id))
  }, [dispatch, id, alert, error])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${productDetail.name} -- ECOMMERCE`} />
          <div className="product-detail">
            <div>
              <Carousel>
                {productDetail.images &&
                  productDetail.images.map((image, index) => (
                    <img
                      className="carousel-image"
                      key={index}
                      src={image.url}
                      alt={image.url}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detail-block1">
                <h2>{productDetail.name}</h2>
                <p>Product # {productDetail._id}</p>
              </div>
              <div className="detail-block2">
                <ReactStars {...options} />
                <span>({productDetail.numOfReviews} Reviews)</span>
              </div>
              <div className="detail-block3">
                <h1>{`$${productDetail.price}`}</h1>
                <div className="detail-block31">
                  <div className="detail-block311">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button onClick={addToCartHandler}>Add to cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      productDetail.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetail < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detail-block4">
                Description: <p>{productDetail.description}</p>
              </div>

              <button className="submit-review">Submit Review</button>
            </div>
          </div>

          <h3 className="review-heading">REVIEWS</h3>

          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
              {productDetail.reviews.map((rev) => (
                <ReviewCard review={rev} />
              ))}
            </div>
          ) : (
            <p className="no-review">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetail
