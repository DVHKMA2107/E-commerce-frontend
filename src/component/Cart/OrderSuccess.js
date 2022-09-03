import React from "react"
import { Link } from "react-router-dom"

import { Typography } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import "./OrderSuccess.scss"

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <CheckCircleIcon />
      <Typography>Your Order has been placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
