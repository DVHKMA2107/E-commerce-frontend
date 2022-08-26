import React, { Fragment, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetail, clearError } from "../../redux/productSlice"
import reviewSlice, {
  createNewReview,
  clearErrors,
} from "../../redux/reviewSlice"
import { useAlert } from "react-alert"
import Loading from "../layout/Loading/Loading"
import { addItemToCart } from "../../redux/cartSlice"
import ReviewCard from "./ReviewCard"
import "./ProductDetail.scss"
import MetaData from "../layout/MetaData"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material"

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  const alert = useAlert()

  const { productDetail, loading, error } = useSelector(
    (state) => state.product
  )
  console.log(productDetail.rating)
  const { success, error: reviewError } = useSelector((state) => state.review)
  const { id } = useParams()

  const options = {
    size: "large",
    value: productDetail.rating,
    isHalf: true,
    precision: 0.5,
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

  const submitReviewToogle = () => {
    openDialog ? setOpenDialog(false) : setOpenDialog(true)
  }

  const reviewSubmitHandler = (e) => {
    const myForm = new FormData()

    myForm.set("rating", rating)
    myForm.set("comment", comment)
    myForm.set("productId", id)

    dispatch(createNewReview(myForm))

    setOpenDialog(false)
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (reviewError) {
      alert.error(error.message)
      dispatch(clearErrors())
    }

    if (success) {
      alert.success("Review Submitted Successfully")
      dispatch(reviewSlice.actions.newReviewReset())
    }
    dispatch(getProductDetail(id))
  }, [dispatch, id, alert, error, success, reviewError])

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
                <Rating {...options} />
                <span className="detail-block2__span">
                  ({productDetail.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detail-block3">
                <h1>{`$${productDetail.price}`}</h1>
                <div className="detail-block31">
                  <div className="detail-block311">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button
                    disabled={productDetail.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      productDetail.Stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetail.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detail-block4">
                Description: <p>{productDetail.description}</p>
              </div>

              <button className="submit-review" onClick={submitReviewToogle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="review-heading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={openDialog}
            onClose={submitReviewToogle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submit-dialog">
              <Rating
                size="large"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              <textarea
                className="dialog__textarea"
                cols={30}
                rows={10}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToogle}>
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
              {productDetail.reviews.map((rev) => (
                <ReviewCard review={rev} key={rev._id} />
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
