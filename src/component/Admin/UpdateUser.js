import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@mui/material"

import PersonIcon from "@mui/icons-material/Person"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"

import adminSlice, {
  getSingleUser,
  updateUser,
  clearError,
} from "../../redux/adminSlice"

import SideBar from "./SideBar"
import MetaData from "../layout/MetaData"
import Loading from "../../component/layout/Loading/Loading"
import "./NewProduct.scss"

const UpdateUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  const { loading, error, isUpdated, userDetail } = useSelector(
    (state) => state.admin
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { id } = useParams()

  const updateUserSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("role", role)

    dispatch(updateUser({ id, updateData: myForm }))
  }

  useEffect(() => {
    if (userDetail && userDetail._id !== id) {
      dispatch(getSingleUser(id))
    } else {
      setName(userDetail.name)
      setEmail(userDetail.email)
      setRole(userDetail.role)
    }

    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isUpdated) {
      alert.success("User Updated Successfully")
      navigate("/admin/users")
      dispatch(adminSlice.actions.updateUserReset())
      dispatch(getSingleUser(id))
    }
  }, [dispatch, alert, error, navigate, isUpdated, userDetail, id])

  return (
    <Fragment>
      <MetaData title="UPDATE USER -- ADMIN" />
      <div className="dashboard">
        <SideBar />

        <div className="new-product__container">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="new-product__form"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Chose category</option>
                  <option value="admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <Button
                id="new-product__button"
                type="submit"
                disabled={loading ? true : false || role === "" ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser
