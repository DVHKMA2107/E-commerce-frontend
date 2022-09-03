import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAlert } from "react-alert"

import { Typography, Button } from "@mui/material"
import AccountTreeIcon from "@mui/icons-material/AccountTree"

import orderSlice, { getOrderDetail, updateOrder } from "../../redux/orderSlice"

import MetaData from "../layout/MetaData"
import Loading from "../layout/Loading/Loading"
import SideBar from "./SideBar"
import "./ProcessOrder.scss"

const ProcessOrder = () => {
  const [status, setStatus] = useState("")

  const { orderDetail, loading, error, isUpdated } = useSelector(
    (state) => state.order
  )

  const { id } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("status", status)

    dispatch(updateOrder({ id, updateData: myForm }))
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(orderSlice.actions.clearErrors())
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully")
      dispatch(orderSlice.actions.updateOrderReset())
    }

    dispatch(getOrderDetail(id))
  }, [dispatch, error, alert, id, isUpdated])

  return (
    <Fragment>
      <MetaData title="PROCESS ORDER -- ADMIN" />
      <div className="dashboard">
        <SideBar />

        <div className="new-product__container">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirm-order__page"
              style={{
                display:
                  orderDetail.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirm-shipping__area">
                  <Typography>Shipping Info</Typography>
                  <div className="order-detail__container-box">
                    <div>
                      <p>Name:</p>
                      <span>{orderDetail.user && orderDetail.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {orderDetail.shippingInfo &&
                          orderDetail.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {orderDetail.shippingInfo &&
                          `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.pinCode}, ${orderDetail.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="order-detail__container-box">
                    <div>
                      <p
                        className={
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.paymentInfo &&
                        orderDetail.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount:</p>
                      <span>
                        {orderDetail.totalPrice && orderDetail.totalPrice}
                      </span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="order-detail__container-box">
                    <div>
                      <p
                        className={
                          orderDetail.orderStatus &&
                          orderDetail.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.orderStatus && orderDetail.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirm-cartItem">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirm-cartItem__container">
                    {orderDetail.orderItems &&
                      orderDetail.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} * ${item.price} ={" "}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display:
                    orderDetail.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="update-order__form"
                  encType="multipart/form-data"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose category</option>
                      {orderDetail.orderStatus === "Process" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {orderDetail.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="new-product__button"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder
