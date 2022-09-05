import React from "react"
import ErrorIcon from "@mui/icons-material/Error"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "./NotFound.scss"

const NotFound = () => {
  return (
    <div className="page-not-found">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NotFound
