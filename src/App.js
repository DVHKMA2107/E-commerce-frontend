import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import WebFont from "webfontloader"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { loadUser } from "./redux/userSlice"

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
import MyOrders from "./component/Order/MyOrders"
import OrderDetail from "./component/Order/OrderDetail"
import DashBoard from "./component/Admin/DashBoard"
import ProductList from "./component/Admin/ProductList"
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from "./component/Admin/OrderList"
import ProcessOrder from "./component/Admin/ProcessOrder"
import UserList from "./component/Admin/UserList"
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReview"
import AdminRoute from "./component/Route/AdminRoute"
import LoginSignup from "./component/User/LoginSignup"
import "./App.scss"

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")

  const { isAuthenticated, user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

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
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
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
