import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import VpnKeyIcon from "@mui/icons-material/VpnKey"

import profileSlice, {
  clearError,
  updatePassword,
} from "../../redux/profileSlice"

import Loading from "../layout/Loading/Loading"
import MetaData from "../layout/MetaData"
import "./UpdatePassword.scss"

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("oldPassword", oldPassword)
    myForm.set("newPassword", newPassword)
    myForm.set("confirmPassword", confirmPassword)
    dispatch(updatePassword(myForm))
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isUpdated) {
      alert.success("password updated succesfully")

      navigate("/account")
      dispatch(profileSlice.actions.updateReset())
    }
  }, [dispatch, error, alert, navigate, isUpdated])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="update-password__container">
            <div className="update-password__box">
              <h2 className="update-password__heading">Change Password</h2>
              <form
                className="update-password__form"
                onSubmit={updatePasswordSubmit}
              >
                <div className="old-password">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="new-password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="confirm-password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  onSubmit={updatePasswordSubmit}
                  value="Change"
                  className="update-password__btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdatePassword
