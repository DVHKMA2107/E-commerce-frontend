import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import StarIcon from "@mui/icons-material/Star"

import reviewSlice, {
  getProductReviews,
  deleteProductReview,
  clearErrors,
} from "../../redux/reviewSlice"

import MetaData from "../layout/MetaData"
import SideBar from "./SideBar"
import "./ProductReview.scss"

const ProductReviews = () => {
  const [productId, setProductId] = useState("")

  const { reviews, error, isDeleted, loading } = useSelector(
    (state) => state.review
  )

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully")
      navigate("/admin/reviews")
      dispatch(getProductReviews(productId))
      dispatch(reviewSlice.actions.deleteReviewReset())
    }
  }, [dispatch, alert, error, isDeleted, navigate, productId])

  const deleteReviewHandler = (id) => {
    dispatch(deleteProductReview({ productId, id }))
  }

  const productReviewSubmitHandler = (e) => {
    e.preventDefault()

    dispatch(getProductReviews(productId))
  }

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor"
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      })
    })

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS -- ADMIN" />

      <div className="dashboard">
        <SideBar />

        <div className="product-review__container">
          <form
            className="product-review__form"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 id="product-review__form-heading">All Reviews</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="product-review__button"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="product-review__table"
              autoHeight
            />
          ) : (
            <h1 className="product-review__form-heading">No Review Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews
