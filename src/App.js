import React, { useEffect } from "react"
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

import "./App.scss"
import LoginSignup from "./component/User/LoginSignup"

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    dispatch(loadUser())
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
