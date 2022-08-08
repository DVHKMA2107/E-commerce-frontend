import React, { Fragment, useEffect } from "react"
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetail, clearError } from "../../redux/productSlice"
import { useAlert } from "react-alert"
import Loading from "../layout/Loading/Loading"

import ReviewCard from "./ReviewCard"
import "./ProductDetail.scss"
import MetaData from "../layout/MetaData"

const ProductDetail = () => {
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
                    <button>-</button>
                    <input value={1} type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to cart</button>
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
