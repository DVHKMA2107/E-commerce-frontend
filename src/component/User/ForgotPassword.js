import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"

import { clearError, forgotPassword } from "../../redux/profileSlice"
import { MailOutline } from "@mui/icons-material"

import Loading from "../layout/Loading/Loading"
import MetaData from "../layout/MetaData"
import "./ForgotPassword.scss"

const ForgotPassword = () => {
  const { error, loading, message } = useSelector((state) => state.profile)
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const alert = useAlert()

  const forgotPasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("email", email)
    dispatch(forgotPassword(myForm))
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (message) {
      alert.success(message)
    }
  }, [dispatch, error, alert, message])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgot-password__container">
            <div className="forgot-password__box">
              <h2 className="forgot-password__heading">Forgot Password</h2>
              <form
                className="forgot-password__form"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgot-password__mail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  onSubmit={forgotPasswordSubmit}
                  value="Send"
                  className="forgot-password__btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgotPassword
