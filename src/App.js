import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./redux/userSlice"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"

import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"
import ProductDetail from "./component/Product/ProductDetail"
import Profile from "./component/User/Profile"
import Home from "./component/Home/Home"
import Search from "./component/Product/Search"
import Products from "./component/Product/Products"
import UserOptions from "./component/layout/Header/UserOptions"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import Payment from "./component/Cart/Payment"
import OrderSuccess from "./component/Cart/OrderSuccess"

import "./App.scss"
import LoginSignup from "./component/User/LoginSignup"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    dispatch(loadUser())

    getStripeApiKey()
  }, [dispatch])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            path="/process/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          />
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
