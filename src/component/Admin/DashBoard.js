import React, { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import { Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { getProductList } from "../../redux/productSlice.js"
import { getAllOrders } from "../../redux/orderSlice.js"
import { getUserList } from "../../redux/adminSlice.js"

import Loading from "../layout/Loading/Loading.js"
import MetaData from "../layout/MetaData"
import SideBar from "./SideBar.js"
import "./DashBoard.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
}

const DashBoard = () => {
  const { products, loading: productLoading } = useSelector(
    (state) => state.product
  )
  const { orders, loading: orderLoading } = useSelector((state) => state.order)
  const { users, loading: userLoading } = useSelector((state) => state.admin)

  const dispatch = useDispatch()

  let outOfStock = 0
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1
      }
    })

  let totalAmount = 0
  orders &&
    orders.forEach((order) => {
      totalAmount += order.totalPrice
    })

  const loading = productLoading || orderLoading || userLoading

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["Tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  }

  useEffect(() => {
    dispatch(getProductList())
    dispatch(getAllOrders())
    dispatch(getUserList())
  }, [dispatch])

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <MetaData title="Dashboard -- Admin" />
      <div className="dashboard">
        <SideBar />

        <div className="dashboard__container">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboard__summary">
            <div>
              <p>
                Total amount <br /> ${totalAmount}{" "}
              </p>
            </div>

            <div className="dashboard__summary-box2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>

              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="line-chart">
            <Line options={options} data={lineState} />
          </div>

          <div className="doughnut-chart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default DashBoard
