import React from "react"
import { ReactNavbar } from "overlay-navbar"
import { BiSearchAlt2 } from "react-icons/bi"
import { FiShoppingBag } from "react-icons/fi"
import { MdPermContactCalendar } from "react-icons/md"
import logo from "../../../images/logo.png"

const options = {
  burgerColorHover: "#eb4034",
  logo: logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Product",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35,35,35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/account",
  profileIcon: true,
  searchIcon: true,
  cartIcon: true,
  ProfileIconElement: MdPermContactCalendar,
  SearchIconElement: BiSearchAlt2,
  CartIconElement: FiShoppingBag,
  profileIconColor: "rgba(35,35,35,0.8)",
  searchIconColor: "rgba(35,35,35,0.8)",
  cartIconColor: "rgba(35,35,35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
}

const Header = () => {
  return (
    <div>
      <ReactNavbar {...options} />
    </div>
  )
}

export default Header
