import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user)
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          {isAuthenticated === false ? (
            <Navigate to="/login" />
          ) : isAuthenticated === true ? (
            <Outlet />
          ) : null}
          {/* {isAuthenticated === false ? <Navigate to="/login" /> : <Outlet />} */}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProtectedRoute
