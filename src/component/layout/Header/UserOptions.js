import React, { Fragment, useState } from "react"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import Profile from "../../../images/Profile.png"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { Dashboard, Person, ExitToApp, ListAlt } from "@mui/icons-material"
import { Backdrop } from "@mui/material"
import { logout } from "../../../redux/userSlice"
import { useDispatch } from "react-redux"
import "./UserOptions.scss"

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()

  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    })
  }
  function orders() {
    navigate("/orders")
  }

  function dashboard() {
    navigate("/dashboard")
  }

  function account() {
    navigate("/account")
  }

  function logoutUser() {
    dispatch(logout())
    alert.success("Logout successfully")
  }
  return (
    <Fragment>
      <Backdrop open={open} stype={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        stype={{ zIndex: "11" }}
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
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
