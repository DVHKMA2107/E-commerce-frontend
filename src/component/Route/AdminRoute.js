import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const AdminRoute = () => {
  const { user } = useSelector((state) => state.user)

  if (user.role !== "admin") {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default AdminRoute
