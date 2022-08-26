import React from "react"
import { Link } from "react-router-dom"
import { Rating } from "@mui/material"
import "./ProductCard.scss"

const ProductCard = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  }
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="product-card__span">
          {product.numOfReviews} Reviews
        </span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
