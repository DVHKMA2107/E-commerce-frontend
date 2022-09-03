import React from "react"
import { Rating } from "@mui/material"

import profilePng from "../../images/Profile.png"
import "./ReviewCard.scss"

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  }

  return (
    <div className="review-card">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="review-card__span">{review.comment}</span>
    </div>
  )
}

export default ReviewCard
