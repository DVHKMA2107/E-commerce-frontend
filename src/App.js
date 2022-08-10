import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"

import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"
import ProductDetail from "./component/Product/ProductDetail"
import Home from "./component/Home/Home"
import Search from "./component/Product/Search"
import Products from "./component/Product/Products"

import "./App.scss"
import LoginSignup from "./component/User/LoginSignup"

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
