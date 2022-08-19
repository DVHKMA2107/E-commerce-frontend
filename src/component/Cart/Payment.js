import React, { Fragment, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import { createOrder, clearErrors } from "../../redux/orderSlice"

import CheckoutSteps from "./CheckoutSteps"
import MetaData from "../layout/MetaData"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import EventIcon from "@mui/icons-material/Event"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import "./Payment.scss"

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useSelector((state) => state.user)
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { order, error } = useSelector((state) => state.order)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const newOrder = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    totalPrice: orderInfo.totalPrice,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
  }

  const payBtn = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    payBtn.current.disabled = true

    try {
      const config = { headers: { "Content-Type": "application/json" } }

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      )

      const client_secret = data.client_secret

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      })

      if (result.error) {
        payBtn.current.disabled = true
        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          newOrder.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(newOrder))
          navigate("/success")
        } else {
          alert.error("There's is some issue while processing payment")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearErrors())
    }
  }, [alert, error, dispatch])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form className="payment-form" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="payment-input" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="payment-input" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="payment-input" />
          </div>

          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="payment-button"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment
