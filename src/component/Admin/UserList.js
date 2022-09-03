import React, { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { Button } from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import adminSlice, {
  clearError,
  deleteUser,
  getUserList,
} from "../../redux/adminSlice"

import MetaData from "../layout/MetaData"
import SideBar from "./SideBar"

const UserList = () => {
  const { users, error, isDeleted, message } = useSelector(
    (state) => state.admin
  )

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isDeleted) {
      alert.success(message)
      navigate("/admin/users")
      dispatch(adminSlice.actions.deleteUserReset())
    }

    dispatch(getUserList())
  }, [dispatch, alert, error, isDeleted, navigate, message])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 200,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 270,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor"
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      })
    })

  return (
    <Fragment>
      <MetaData title="ALL USERS -- ADMIN" />

      <div className="dashboard">
        <SideBar />

        <div className="product-list__container">
          <h1 id="product-list__heading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="product-list__table"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default UserList
