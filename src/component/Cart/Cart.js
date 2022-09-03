import React, { Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"

import { Typography } from "@mui/material"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

import { addItemToCart, removeItemsFromCart } from "../../redux/cartSlice"

import CartItemCard from "./CartItemCard"
import "./Cart.scss"

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      alert.error("The quantity must be lower than Stock")
      return
    }
    const newQuantity = quantity + 1
    dispatch(addItemToCart({ id, quantity: newQuantity }))
  }

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) {
      alert.error("The quantity must be greater than 1")
      return
    }
    const newQuantity = quantity - 1
    dispatch(addItemToCart({ id, quantity: newQuantity }))
  }

  const deleteFromCartHandler = (id) => {
    dispatch(removeItemsFromCart(id))
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping")
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <RemoveShoppingCartIcon />

          <Typography>No product in your cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cart-page">
            <div className="cart-header">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((cartItem) => (
                <div className="cart-container" key={cartItem.product}>
                  <CartItemCard
                    item={cartItem}
                    deleteFromCart={deleteFromCartHandler}
                  />
                  <div className="cart-input">
                    <button
                      onClick={() =>
                        decreaseQuantity(cartItem.product, cartItem.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={cartItem.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          cartItem.product,
                          cartItem.quantity,
                          cartItem.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-subtotal">{`$${
                    cartItem.price * cartItem.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cart-profit__total">
              <div></div>
              <div className="cart-profit__box">
                <p>Groos Total</p>
                <p>{totalPrice}</p>
              </div>
              <div></div>
              <div className="checkout-button">
                <button onClick={checkoutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
