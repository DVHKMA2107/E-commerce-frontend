import React, { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"

import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import Backdrop from "@mui/material/Backdrop"
import DashBoardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { logout } from "../../../redux/userSlice"

import Profile from "../../../images/Profile.png"
import "./UserOptions.scss"

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false)

  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({
      icon: <DashBoardIcon />,
      name: "Dashboard",
      func: dashboard,
    })
  }
  function orders() {
    navigate("/orders")
  }

  function dashboard() {
    navigate("/admin/dashboard")
  }

  function account() {
    navigate("/account")
  }

  function cart() {
    navigate("/cart")
  }

  function logoutUser() {
    dispatch(logout())
    alert.success("Logout successfully")
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "99" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "100" }}
        className="speed-dial"
        direction="down"
        icon={
          <img
            className="speed-dial--icon"
            src={user.avatar.url ? user.avatar.url : Profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
