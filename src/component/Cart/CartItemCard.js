import React from "react"
import { Link } from "react-router-dom"
import "./CartItemCard.scss"

const CartItemCard = ({ item, deleteFromCart }) => {
  return (
    <div className="cart-item__card">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price $${item.price}`}</span>
        <p onClick={() => deleteFromCart(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
