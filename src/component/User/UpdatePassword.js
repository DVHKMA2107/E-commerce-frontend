import React, { Fragment, useState, useEffect } from "react"
import { LockOpen, Lock, VpnKey } from "@mui/icons-material"
import Loading from "../layout/Loading/Loading"
import MetaData from "../layout/MetaData"
import { useNavigate } from "react-router-dom"
import profileSlice, {
  clearError,
  updatePassword,
} from "../../redux/profileSlice"
import "./UpdatePassword.scss"

import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"

const UpdatePassword = () => {
  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="new-password">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="confirm-password">
                  <Lock />
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
