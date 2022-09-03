import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import LockIcon from "@mui/icons-material/Lock"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import Loading from "../layout/Loading/Loading"

import { clearError, resetPassword } from "../../redux/profileSlice"

import MetaData from "../layout/MetaData"
import "./ResetPassword.scss"

const ResetPassword = () => {
  const { error, loading, success } = useSelector((state) => state.profile)
  const { token } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetPasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("password", password)
    myForm.set("confirmPassword", confirmPassword)
    dispatch(resetPassword({ token, passwords: myForm }))
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (success) {
      alert.success("Reset password successfully")

      navigate("/login")
    }
  }, [dispatch, error, alert, navigate, success])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="reset-password__container">
            <div className="reset-password__box">
              <h2 className="reset-password__heading">Change Password</h2>
              <form
                className="reset-password__form"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
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
                  onSubmit={resetPasswordSubmit}
                  value="Update"
                  className="reset-password__btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ResetPassword
