import React from "react"
import { Typography } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Link } from "react-router-dom"
import "./OrderSuccess.scss"

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <CheckCircleIcon />
      <Typography>Your Order has been placed successfully</Typography>
      <Link to="/order/me">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
