import React, { Fragment } from "react"
import { CgMouse } from "react-icons/cg"
import "./Home.scss"
import Product from "./Product"

const product = {
  name: "Blue T-Shirt",
  images: [
    {
      url: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1197827/2018/3/7/11520418139882-ETHER-Light-Blue-T-shirt-5521520418139565-1.jpg",
    },
  ],
  price: "3000$",
  _id: "12345",
}

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h1 className="home-heading">Featured Products</h1>
      <div id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  )
}

export default Home
