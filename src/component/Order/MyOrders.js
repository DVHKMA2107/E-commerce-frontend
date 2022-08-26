import React, { Fragment, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector, useDispatch } from "react-redux"
import { getMyOrders, clearErrors } from "../../redux/orderSlice"
import Loading from "../layout/Loading/Loading"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import MetaData from "../layout/MetaData"
import LaunchIcon from "@mui/icons-material/Launch"
import { useAlert } from "react-alert"
import "./MyOrders.scss"

const MyOrders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { user } = useSelector((state) => state.user)
  const { loading, error, orders } = useSelector((state) => state.order)

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor"
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        )
      },
    },
  ]
  const rows = []

  orders &&
    orders.forEach((item, index) =>
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    )

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearErrors())
    }

    dispatch(getMyOrders())
  }, [alert, dispatch, error])
  return (
    <Fragment>
      <MetaData title={`${user.name}'s Orders`} />

      {loading ? (
        <Loading />
      ) : (
        <div className="orders-page">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orders-table"
            autoHeight
          />
          <Typography id="orders-page__heading">
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  )
}

export default MyOrders
