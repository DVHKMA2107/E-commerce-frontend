import React, { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import orderSlice, {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/orderSlice"

import MetaData from "../layout/MetaData"
import SideBar from "./SideBar"
import Loading from "../layout/Loading/Loading"
import "./ProductList.scss"

const OrderList = () => {
  const { orders, error, isDeleted, loading } = useSelector(
    (state) => state.order
  )

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully")
      navigate("/admin/orders")
      dispatch(orderSlice.actions.deleteOrderReset())
    }

    dispatch(getAllOrders())
  }, [dispatch, alert, error, isDeleted, navigate])

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor"
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
      minWidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      })
    })

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="ALL ORDERS -- ADMIN" />

          <div className="dashboard">
            <SideBar />

            <div className="product-list__container">
              <h1 id="product-list__heading">ALL ORDERS</h1>

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
      )}
    </Fragment>
  )
}

export default OrderList
