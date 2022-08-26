import React, { Fragment, useEffect } from "react"
import SideBar from "./SideBar.js"
import "./DashBoard.scss"
import { Typography } from "@mui/material"
import { Link, Navigate } from "react-router-dom"
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
import { Line, Doughnut } from "react-chartjs-2"
import { useSelector, useDispatch } from "react-redux"
import { getProductList } from "../../redux/productSlice.js"

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
  const { user } = useSelector((state) => state.user)
  const { products } = useSelector((state) => state.product)

  const dispatch = useDispatch()

  let outOfStock = 0
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1
      }
    })

  console.log(outOfStock)

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["Tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
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

  return (
    <Fragment>
      {user.role !== "admin" ? (
        <Navigate to="/login" />
      ) : (
        <div className="dashboard">
          <SideBar />

          <div className="dashboard__container">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboard__summary">
              <div>
                <p>
                  Total amount <br /> $2000{" "}
                </p>
              </div>

              <div className="dashboard__summary-box2">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{products && products.length}</p>
                </Link>

                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>10</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>2</p>
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
      )}
    </Fragment>
  )
}
export default DashBoard
