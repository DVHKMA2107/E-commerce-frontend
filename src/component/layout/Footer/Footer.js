import React from "react"

import AppStore from "../../../images/Appstore.png"
import PlayStore from "../../../images/playstore.png"
import "./Footer.scss"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="left-footer">
        <h4>DOWNLOAD MY APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={PlayStore} alt="Playstore" />
        <img src={AppStore} alt="Appstore" />
      </div>

      <div className="mid-footer">
        <h1>ECOMMERCE</h1>
        <p>High Quality is my first priority</p>
        <p>Copyrights 2022 &copy; DVHKMA2107</p>
      </div>

      <div className="right-footer">
        <h4>Follow Me</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.youtube.com/">Youtube</a>
        <a href="https://www.facebook.com/hoadamviet/">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer
