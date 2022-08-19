import React, { Fragment } from "react"
import CheckoutSteps from "./CheckoutSteps"
import "./ConfirmOrder.scss"
import "./CheckoutSteps.scss"
import MetaData from "../layout/MetaData"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"

const ConfirmOrder = () => {
  const navigate = useNavigate()

  const { cartItems, shippingInfo } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const tax = subTotal * 0.18

  const shippingCharges = subTotal > 1000 ? 0 : 200

  const totalPrice = shippingCharges + subTotal + tax

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

  const proceedPaymentHandler = () => {
    const orderInfo = { subTotal, totalPrice, tax, shippingCharges }

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo))

    navigate("/process/payment")
  }
  return (
    <Fragment>
      <MetaData title="Confirm Order"></MetaData>
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order__page">
        <div>
          <div className="confirm-shipping__area">
            <Typography>Shipping Info</Typography>
            <div className="confirm-shipping-box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirm-cartItem">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm-cartItem__container">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} * ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="order-sumary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="order-summary__total">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={proceedPaymentHandler}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder
