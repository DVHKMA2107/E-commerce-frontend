import React, { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import productSlice, {
  getProductList,
  deleteProduct,
  clearError,
} from "../../redux/productSlice"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@mui/material"
import MetaData from "../layout/MetaData"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SideBar from "./SideBar"

import "./ProductList.scss"

const ProductList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { products, error, isDeleted } = useSelector((state) => state.product)

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully")
      navigate("/admin/dashboard")
      dispatch(productSlice.actions.deleteProductReset())
    }

    dispatch(getProductList())
  }, [dispatch, alert, error, isDeleted, navigate])

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      })
    })

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS -- ADMIN" />

      <div className="dashboard">
        <SideBar />

        <div className="product-list__container">
          <h1 id="product-list__heading">ALL PRODUCTS</h1>

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

export default ProductList
