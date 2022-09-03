import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import { Typography } from "@mui/material"

import { getOrderDetail, clearErrors } from "../../redux/orderSlice"

import MetaData from "../layout/MetaData"
import Loading from "../layout/Loading/Loading"
import "./OrderDetail.scss"

const OrderDetail = () => {
  const { orderDetail, error, loading } = useSelector((state) => state.order)

  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams()

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearErrors())
    }

    dispatch(getOrderDetail(id))
  }, [alert, error, dispatch, id])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Order Detail" />
          <div className="order-detail__page">
            <div className="order-detail__page-container">
              <Typography component="h1">
                Order #{orderDetail && orderDetail._id}
              </Typography>
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

            <div className="order-detail__cartItem">
              <Typography>Order Items</Typography>
              <div className="order-detail__cartItem-container">
                {orderDetail.orderItems &&
                  orderDetail.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.proudct}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ${item.price} ={" "}
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetail
