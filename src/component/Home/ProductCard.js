import React from "react"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import "./ProductCard.scss"

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.size < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  }
  return (
    <Link className="product-card" to={`product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>{product.numOfReviews} Reviews</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
